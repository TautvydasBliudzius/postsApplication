import { mount, shallowMount } from "@vue/test-utils";
import CustomButton from "../components/Buttons/CustomButton.vue"
import { describe, it, expect, test } from "vitest";

describe("CustomButton.vue", () => {

    it("Trigger the click event on the button", () => {    
        const wrapper = shallowMount(CustomButton)
        wrapper.find('router-link').trigger('click');        
    });

    it("Check if button exists", () => {
        const wrapper = shallowMount(CustomButton);
        expect(wrapper.find('router-link').exists()).toBe(true);
    });

    it("Renders with a custom message", async () => {
        const testText = "test"
        const wrapper = shallowMount(CustomButton);

        await wrapper.setProps({ text: 'test' })
    
        expect(wrapper.vm.text).toBe(testText);
      });

    it("Renders with a custom location", async () => {
        const location = "/test"
        const wrapper = shallowMount(CustomButton);

        await wrapper.setProps({ location: '/test' })
    
        expect(wrapper.vm.location).toBe(location);
      });
      

});

