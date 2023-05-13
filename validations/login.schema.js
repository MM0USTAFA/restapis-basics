export default {
  username: {
    isAlphanumeric: true,
    notEmpty: true,
    optional: false,
    isLength: { options: { min: 8 } },
    errorMessage: 'username should be string with at leaset 8 alphanumeric',
  },
  password: {
    isStrongPassword: true,
    notEmpty: true,
    optional: false,
    isLength: { options: { min: 8, max: 32 } },
    errorMessage:
      'password should be string with at leaset 8 digits, it has at least 1 lowercase, 1 uppercase letter, and one symbol'
  }
}