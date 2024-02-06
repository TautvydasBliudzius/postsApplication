export default {
    methods: {
        containsSpecialChars(str) {
            const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~0-9]/;
            return specialChars.test(str);
          },
    }
  }
  