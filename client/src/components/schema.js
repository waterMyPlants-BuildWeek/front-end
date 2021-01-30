import * as yup from "yup";

let schema = yup.object().shape({
  nickname: yup.string().required("Please provide a first name"),
  species: yup.string().required("Please provide a last name"),
  h2oFrequency: yup.string().required('Please provide a watering cycle'),
  
});

export default schema;
