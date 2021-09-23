export const ENUM = Object.freeze({
  USER: {
    ROLE: {
      CUSTOMER: 'customer',
      BUSINESS: 'business'
    },
    STATUS: {
      INACTIVE: 0,
      ACTIVE: 1,
      BLOCK: 2,
      DELETE: 3
    }
  }
});

export const ENUM_ARR = Object.freeze({
  USER: {
    STATUS: Object.values(ENUM.USER.STATUS)
  }
});
