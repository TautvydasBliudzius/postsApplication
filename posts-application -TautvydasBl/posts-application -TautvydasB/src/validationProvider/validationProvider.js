import { extend } from "vee-validate";
import { required } from 'vee-validate/dist/rules';

extend('minmax', {
  validate(value, { min, max }) {
    return value.length >= min && value.length <= max;
  },
  params: ['min', 'max'],
  message: "3-15 symbols are allowed"
});

extend(`nameFirstSymbol`, value => {
  if (!(value.startsWith(` `) || value.startsWith(`.`))) {
    return true;
  }
  return "Name must start with a letter"
})

extend('specChars', value => {
  const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~0-9]/
  if (!specialChars.test(value)) {
    return true;
  }
  return "Name must consist of letters";
});

extend(`nameIncludesDots`, value => {
  if (!value.includes(`..`)) {
    return true;
  }
  return "`.` characters cannot be repeated"
})

extend(`nameIncludesSpaces`, value => {
  if (!value.includes(`  `)) {
    return true;
  }
  return "`Space` characters cannot be repeated"
})

extend('minmaxTitle', {
  validate(value, { min, max }) {
    return value.length >= min && value.length <= max;
  },
  params: ['min', 'max'],
  message: "1-30 symbols are allowed"
});

extend('minmaxPost', {
  validate(value, { min, max }) {
    return value.length >= min && value.length <= max;
  },
  params: ['min', 'max'],
  message: "1-500 symbols are allowed"
});

extend("required", {
  ...required,
  message: "This field is required",
});



export default {
  data() {
    return {
      value: "",
    };
  },
};
