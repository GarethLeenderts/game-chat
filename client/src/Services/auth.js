const RFC5322_EMAIL_REGEX = `/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|
                            (".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|
                            (([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/`;

export const isEmailValid = (email) => {
    return RFC5322_EMAIL_REGEX.test(email);
};

export const isPasswordValid = (password) => {
    // 1. Contains at least 8 characters
    // 2. Contains at least 1 number
    // 3. Contains at least 1 special character
    // 4. At least 1 lowercase character
    // 5. At least 1 uppercase character

    const oneNumRegex = new RegExp('.*[0-9]+.*');
    const oneLowercaseRegex = new RegExp('.*[a-z]+.*');
    const oneUppercaseRegex = new RegExp('.*[A-Z]+.*');
    const oneSpecialCharRegex = new RegExp('.*[!@#$%^&*].*');

    const validationObject = {
        validLength: Boolean(password.length > 7),
        oneNum: oneNumRegex.test(password),
        oneLowercase: oneLowercaseRegex.test(password),
        oneUppercase: oneUppercaseRegex.test(password),
        oneSpecialChar: oneSpecialCharRegex.test(password),
    };

    let passwordValid = true;
    // for (const [key, value] of Object.entries(validationObject)) {
    for (const value of Object.values(validationObject)) {
        passwordValid = passwordValid * value; // will be false if any single value in the object is false
    };

    validationObject.passwordValid = passwordValid;
    
    return validationObject
};

export const doPasswordsMatch = (passwordOne, passwordTwo) => {
    if (passwordOne.length !== passwordTwo.length) {
        return false;
    };

    for (let i=0; i < passwordOne.length; i++) {
        
        if (passwordOne[i] !== passwordTwo[i]) {
            return false;
        };
    };

    return true;
};

// export { isEmailValid, isPasswordValid, doPasswordsMatch };