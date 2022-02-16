import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Skill } from "../models/skill";

export default class SkillStore {
    skillsRegistry = new Map<string, Skill>();
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setLoading(state: boolean) {
        this.loading = state;
    }

    loadSkills = async (searchString?: string) => {
        this.setLoading(true);
        try {
            const skills = await agent.Skills.getSkills();
            skills.forEach(skill => {
                this.setSkill(skill);
            });
            this.setLoading(false);
            return skills;
        } catch (error) {
            console.error(error);
            this.setLoading(false);
        }
    }

    addSkills = async (skillsToAdd: Skill[]) => {
        try {
            await agent.Skills.addSkillRange(skillsToAdd);
            return skillsToAdd;
        } catch (error) {
            console.error(error);
        }
    }

    private setSkill = (skill: Skill) => {
        this.skillsRegistry.set(skill.userSkillId!, skill);
    }
}