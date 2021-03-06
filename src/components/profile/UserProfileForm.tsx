import React, { useState, useEffect } from 'react';
import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';
import * as Yup from "yup";
import { useStore } from '../../stores/store';
import LoadingComponent from "../LoadingComponent";
import slugify from "../../helpers/slugify";
import DateInput from '../common/forms/DateInput';
import FileInput from '../common/forms/FileInput';
import MultiSelectInput from '../common/forms/MultiSelectInput';
import TextareaInput from '../common/forms/TextareaInput';
import TextInput from '../common/forms/TextInput';
import { OptionType } from '../../models/options';
import { Skill } from '../../models/skill';
import { IPhoto } from "../../models/photo";
import { UserProfile } from '../../models/user';
import axios, { AxiosError } from 'axios';

function UserProfileForm() {
    const { userStore, userProfileStore } = useStore();
    const { getUserById, updateUserById, loadingInitial, loading } = userProfileStore;
    const [profileImageUrl, setProfileImageUrl] = useState<string | undefined>(undefined);
    const [currentSelections, setCurrentSelections] = useState<OptionType[]>([]);
    const [multiSelectKey, setMultiSelectKey] = useState("");
    const [userProfile, setUserProfile] = useState<UserProfile>({
        firstName: "",
        lastName: "",
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
        email: "",
        phoneNumber: "",
        birthday: null,
        biography: "",
        photos: Array<IPhoto>(),
        skills: Array<Skill>(),
    });
    
    let userId = "";

    if (userStore.user && userStore.user.userId) {
        userId = userStore.user.userId;
    }
    
    useEffect(() => {
        if (userId !== "") {
            getUserById(userId).then(profile => {
                setUserProfile(profile!);

                if (profile?.photos && profile?.photos?.length > 0) {
                    const currentImage = profile.photos.find(p => p.isCurrent === true);
                    setProfileImageUrl(currentImage?.url);
                }

                setCurrentSelections([]);

                profile!.skills.forEach(skill => {
                    const skillOptionValue = `${skill.userSkillId!}.${skill.skillNameSlug!}`;
                    setCurrentSelections(existing => [...existing, { value: skillOptionValue, label: skill.skillName }]);
                });
                
                setMultiSelectKey(uuidv4());
            });
        }
    }, [userId, getUserById]);

    if (loadingInitial || loading) return <LoadingComponent />;

    return (
        <Formik
            enableReinitialize
            initialValues={{
                firstName: userProfile.firstName,
                lastName: userProfile.lastName,
                streetAddress: userProfile.streetAddress ?? "",
                city: userProfile.city ?? "",
                state: userProfile.state ?? "",
                zipCode: userProfile.zipCode ?? "",
                phoneNumber: userProfile.phoneNumber ?? "",
                birthday: userProfile.birthday,
                biography: userProfile.biography ?? "",
                profileImageFile: {} as File,
                skills: userProfile.skills ?? new Array<Skill>(),
            }}
            validationSchema={Yup.object({
                firstName: Yup
                            .string()
                            .max(50, "First name cannot be greater than 50 characters.")
                            .required("Please enter your first name."),
                lastName: Yup
                            .string()
                            .max(50, "Last name cannot be greater than 50 characters.")
                            .required("Please enter your last name."),
                streetAddress: Yup
                            .string()
                            .max(100, "Street address cannot be greater than 100 characters.")
                            .required("Please enter your street address."),
                city: Yup
                            .string()
                            .max(50, "City cannot be greater than 50 characters.")
                            .required("Please enter your city."),
                state: Yup
                            .string()
                            .max(25, "State cannot be greater than 25 characters.")
                            .required("Please enter your state."),
                zipCode: Yup
                            .string()
                            .max(25, "Zip code cannot be greater than 25 characters.")
                            .required("Please enter your zip code."),
                phoneNumber: Yup
                            .string()
                            .required()
                            .max(25, "Phone number cannot be greater than 25 characters."),
                birthday: Yup
                            .date()
                            .required("Please enter your birthday.")
                            .nullable(),
                biography: Yup
                            .string()
                            .max(500, "Biography cannot be greater than 500 characters."),
            })}
            onSubmit={ async (values, { setErrors, setSubmitting } ) => {
                try {
                    if (values.profileImageFile.size != null && values.profileImageFile.size > 0) {
                        const formData = new FormData();
                        formData.append('photo', values.profileImageFile);
    
                        await axios.post<IPhoto>("/photos", formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            })
                            .then(response => {
                                // console.log(response.data);
                                // userStore.getUser();
                            })
                            .catch((error: AxiosError) => {
                                console.error(error);
                            });
                    }

                    // Create array of Skills from currentSelections
                    values.skills = currentSelections.map(selection => ({
                            userSkillId: selection.__isNew__ ? uuidv4() : selection.value.split(".")[0],
                            skillName: selection.label,
                            skillNameSlug: selection.__isNew__ ? slugify(selection.label) : selection.value.split(".")[1],
                            isNew: selection.__isNew__ ?? false,
                        } as Skill
                    ));

                    updateUserById(userId, values).then(async () => {
                        const updatedProfile = await getUserById(userId);
                        setUserProfile(updatedProfile!);
                        if (updatedProfile?.photos && updatedProfile?.photos?.length > 0) {
                            setProfileImageUrl(updatedProfile.photos[0].url);
                        }
                        await userStore.getUser();
                        toast.success("Your profile has been successfully updated.");
                    });
                } catch (error) {
                    toast.error("There was an error updating your profile.");
                    setSubmitting(false);
                }
            }}
        >
            {formik => (
                <Form className='container mx-auto my-10 px-4'>
                    <div className='w-full mb-6 pb-6 flex flex-col border-b-2 border-gray-300 md:flex-row'>
                        <h4 className="text-gray-500 md:basis-1/3 md:flex-none lg:basis-1/4">
                            Profile image
                        </h4>
                        <FileInput 
                            name="profileImageFile"
                            currentPhotoUrl={profileImageUrl}
                        />
                    </div>
                    <div className='w-full mb-6 pb-6 flex flex-col border-b-2 border-gray-300 md:flex-row'>
                        <h4 className="text-gray-500 md:basis-1/3 md:flex-none lg:basis-1/4">
                            Personal information
                        </h4>
                        <div className='space-y-6 md:basis-2/3 md:flex-none lg:basis-3/4'>
                            <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                                <TextInput
                                    label="First name"
                                    name="firstName"
                                    type="text"
                                />
                                <TextInput
                                    label="Last name"
                                    name="lastName"
                                    type="text"
                                />
                            </div>
                            <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                                <DateInput
                                    label="Birthday"
                                    name="birthday"
                                />
                            </div>
                            <div className='grid grid-cols-1'>
                                <TextInput 
                                    label="Street Address"
                                    name="streetAddress"
                                    type="text"
                                />
                            </div>
                            <div className='grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3'>
                                <TextInput
                                    label="City"
                                    name="city"
                                    type="text"
                                />
                                <TextInput
                                    label="State"
                                    name="state"
                                    type="text"
                                />
                                <TextInput
                                    label="Zip Code"
                                    name="zipCode"
                                    type="text"
                                />
                            </div>
                            <div className='grid grid-cols-1'>
                                <TextInput
                                    label="Phone"
                                    name="phoneNumber"
                                    type="tel"
                                />
                            </div>
                        </div>
                    </div>
                    <div className='w-full mb-6 pb-6 flex flex-col border-b-2 border-gray-300 md:flex-row'>
                        <h4 className="text-gray-500 md:basis-1/3 md:flex-none lg:basis-1/4">
                            Skills Description
                        </h4>
                        <div className='space-y-6 md:basis-2/3 md:flex-none lg:basis-3/4'>
                            <MultiSelectInput
                                key={multiSelectKey}
                                name='skills'
                                label='Skills'
                                isMultiSelect
                                currentSelections={currentSelections}
                                onSelectionChange={setCurrentSelections}
                            />
                            <TextareaInput
                                label="Additional Information"
                                name="biography"
                                maxLength={500}
                                rows={4}
                            />
                        </div>
                    </div>
                    <div className='w-full mb-6 pb-6 flex justify-end md:flex-row'>
                        <button
                            type="submit"
                            className={formik.isSubmitting ? "form-button-disabled" : "form-button"}
                            disabled={formik.isSubmitting || userId === ""}
                        >
                            {formik.isSubmitting 
                                    ? <CircularProgress size={16} sx={{ color: "#fff" }} /> 
                                    : <EditIcon fontSize="small" />}
                                    Edit Profile
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default observer(UserProfileForm);