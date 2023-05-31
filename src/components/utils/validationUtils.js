export const validatePositiveInteger = (value) => {
  const intValue = parseInt(value);
  if (isNaN(intValue) || intValue <= 0) {
    return "Veuillez entrer un nombre entier positif supérieur à 0.";
  }
  
  return ""; // Retourne une chaîne vide si le nombre est valide
};

export const validateMinLength = (value, minLength) => {
  const trimmedValue = value.trim();
  if (trimmedValue.length < minLength) {
    return `La longueur minimale requise est de ${minLength} caractères.`;
  }

  return "";
};

export const validateMaxLength = (value, maxLength) => {
  const trimmedValue = value.trim();
  if (trimmedValue.length > maxLength) {
    return `La longueur maximale autorisée est de ${maxLength} caractères.`;
  }

  return "";
};

export const validatePasswordMinLength = (password, minLength) => {
  if (password.length < minLength) {
    return `Le mot de passe doit contenir au moins ${minLength} caractères.`;
  }

  return "";
};

export const validatePasswordLowercase = (password) => {
  if (!/[a-z]/.test(password)) {
    return "Le mot de passe doit contenir au moins 1 lettre minuscule.";
  }

  return ""; // Retourne une chaîne vide si le mot de passe contient une minuscule
};

export const validatePasswordUppercase = (password) => {
  if (!/[A-Z]/.test(password)) {
    return "Le mot de passe doit contenir au moins 1 lettre majuscule.";
  }

  return ""; // Retourne une chaîne vide si le mot de passe contient une majuscule
};

export const validatePasswordNumber = (password) => {
  if (!/\d/.test(password)) {
    return "Le mot de passe doit contenir au moins 1 chiffre.";
  }

  return ""; // Retourne une chaîne vide si le mot de passe contient un chiffre
};

export const validatePasswordSpecialCharacter = (password) => {
  if (!/[!@#$%^&*()\-_=+[{\]}\\|:;"'<,>.?/]/.test(password)) {
    return "Le mot de passe doit contenir au moins 1 caractère spécial.";
  }

  return ""; // Retourne une chaîne vide si le mot de passe contient un caractère spécial
};

/**
 * Valide le mot de passe en appliquant différentes règles.
 * @param {*} password Le mot de passe à valider
 * @returns Un objet contenant les erreurs de validation
 */
export const validatePassword = (password) => {
  const errors = {};

  // Valider la longueur minimale
  const minLengthError = validatePasswordMinLength(password, 8);
  if (minLengthError) {
    errors.password = minLengthError;
    return errors;
  }

  // Valider la présence d'une lettre minuscule
  const lowercaseError = validatePasswordLowercase(password);
  if (lowercaseError) {
    errors.password = lowercaseError;
    return errors;
  }

  // Valider la présence d'une lettre majuscule
  const uppercaseError = validatePasswordUppercase(password);
  if (uppercaseError) {
    errors.password = uppercaseError;
    return errors;
  }

  // Valider la présence d'un chiffre
  const numberError = validatePasswordNumber(password);
  if (numberError) {
    errors.password = numberError;
    return errors;
  }

  // Valider la présence d'un caractère spécial
  const specialCharError = validatePasswordSpecialCharacter(password);
  if (specialCharError) {
    errors.password = specialCharError;
    return errors;
  }

  return errors;
};

/**
 * Valide l'adresse en appliquant la longueur minimale requise.
 * @param {*} address L'adresse à valider
 * @returns Un objet contenant les erreurs de validation
 */
export const validateAddress = (address) => {
  const errors = {};

  // Valider la longueur minimale
  const minLengthError = validateMinLength(address, 1);
  if (minLengthError.trim()) {
    errors.address = minLengthError;
    return errors;
  }

  return errors;
};

/**
 * Valide les informations du client en appliquant la longueur minimale et maximale requise.
 * @param {*} customer Les informations du client à valider
 * @returns Un objet contenant les erreurs de validation
 */
export const validateCustomer = (customer) => {
  const errors = {};

  // Valider la longueur minimale
  const minLengthError = validateMinLength(customer, 2);
  if (minLengthError.trim()) {
    errors.customer = minLengthError;
    return errors;
  }

  // Valider la longueur maximale
  const maxLengthError = validateMaxLength(customer, 50);
  if (maxLengthError.trim()) {
    errors.customer = maxLengthError;
    return errors;
  }

  return errors;
};
