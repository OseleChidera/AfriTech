import * as Yup from 'yup';

export const SigninSchema = Yup.object().shape({
    email: Yup.string()
        .min(2, "Too Short!")
        .max(45, "Too Long!")
        .required("Required"),
    password: Yup.string()
        .min(8, "Too Short!")
        .max(12, "Too Long!")
        .required("Required"),
});



// export const initialValues = {
//     email: '',
//     password: '',
//     confirm_password: '',
//     firstName: '',
//     lastName: '',
//     Username: '',
//     Phone: '',
//     address: '',
//     passportnumber: '',
//     image: null,
//     ninnumber: '',
//     image2: null,
//     agreeToTerms: false
// }
// export const validationSchema = Yup.object().shape({
//     step1: Yup.object().shape({
//         email: Yup.string()
//             .min(2, 'Too Short!')
//             .max(45, 'Too Long!')
//             .required('Required'),
//         password: Yup.string()
//             .min(8, 'Too Short!')
//             .max(12, 'Too Long!')
//             .required('Required'),
//         confirm_password: Yup.string()
//             .min(8, 'Too Short!')
//             .max(12, 'Too Long!')
//             .required('Required')
//             .oneOf([Yup.ref("password")], "Passwords must match"),
//     }),
//     step2: Yup.object().shape({
//         firstName: Yup.string()
//             .min(2, 'Too Short!')
//             .max(15, 'Too Long!')
//             .required('Required'),
//         lastName: Yup.string()
//             .min(2, 'Too Short!')
//             .max(15, 'Too Long!')
//             .required('Required'),
//         Username: Yup.string()
//             .min(2, 'Too Short!')
//             .max(10, 'Too Long!')
//             .required('Required'),
//         Phone: Yup.string()
//             .min(10, 'Too Short!')
//             .max(11, 'Too Long!')
//             .required('Required'),
//         address: Yup.string()
//             .min(10, 'Too Short!')
//             .max(45, 'Too Long!')
//             .required('Required'),
//     }),
//     step3: Yup.object().shape({
//         passportnumber: Yup.string()
//             .min(2, 'Too Short!')
//             .max(8, 'Too Long!')
//             .required('Required'),
//         image: Yup.mixed()
//             .required('Image is required')
//             .test('fileSize', 'Image must be less than 2MB', (value) => value && value.size <= 2 * 1024 * 1024)
//             .test('fileType', 'Invalid file type. Only JPG and PNG are allowed.', (value) =>
//                 value && (value.type === 'image/jpeg' || value.type === 'image/png')
//             ),
//         ninnumber: Yup.number()
//             .required('Required')
//             .test("length", "too long", (value) => value.toString().length === 6),
//         image2: Yup.mixed()
//             .required('Image is required')
//             .test('fileSize', 'Image must be less than 2MB', (value) => value && value.size <= 2 * 1024 * 1024)
//             .test('fileType', 'Invalid file type. Only JPG and PNG are allowed.', (value) =>
//                 value && (value.type === 'image/jpeg' || value.type === 'image/png')
//             ),
//     }),
//     step4: Yup.object().shape({
//         agreeToTerms: Yup.bool()
//             .required('You cant proceed further without accepting therms')
//     }),



// });
export const step1ValidationSchema = Yup.object().shape({
    email: Yup.string()
        .min(2, 'Too Short!')
        .max(45, 'Too Long!')
        .required('Required'),
    password: Yup.string()
        .min(8, 'Too Short!')
        .max(12, 'Too Long!')
        .required('Required'),
    confirm_password: Yup.string()
        .min(8, 'Too Short!')
        .max(12, 'Too Long!')
        .required('Required')
        .oneOf([Yup.ref("password")], "Passwords must match"),
})

export const step2ValidationSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(15, 'Too Long!')
        .required('Required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(15, 'Too Long!')
        .required('Required'),
    Username: Yup.string()
        .min(2, 'Too Short!')
        .max(10, 'Too Long!')
        .required('Required'),
    Phone: Yup.string()
        .min(10, 'Too Short!')
        .max(11, 'Too Long!')
        .required('Required'),
    address: Yup.string()
        .min(10, 'Too Short!')
        .max(60, 'Too Long!')
        .required('Required'),

})
export const step3ValidationSchema = Yup.object().shape({
    passportnumber: Yup.string()
        .min(2, 'Too Short!')
        .max(8, 'Too Long!')
        .required('Required'),
    image: Yup.mixed()
        .required('Image is required')
        .test('fileSize', 'Image must be less than 2MB', (value) => value && value.size <= 2 * 1024 * 1024)
        .test('fileType', 'Invalid file type. Only JPG and PNG are allowed.', (value) =>
            value && (value.type === 'image/jpeg' || value.type === 'image/png')
        ),
    ninnumber: Yup.number()
        .required('Required')
        .test("length", "too long", (value) => value.toString().length === 6),
    image2: Yup.mixed()
        .required('Image is required')
        .test('fileSize', 'Image must be less than 2MB', (value) => value && value.size <= 2 * 1024 * 1024)
        .test('fileType', 'Invalid file type. Only JPG and PNG are allowed.', (value) =>
            value && (value.type === 'image/jpeg' || value.type === 'image/png')
        ),
})
