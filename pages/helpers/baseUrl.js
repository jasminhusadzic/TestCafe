import config from '../../config.json';

const baseUrlOf = {
    "dev": config.baseUrlDev,
    "test": config.baseUrlTest,
    "staging": config.baseUrlStaging
};

export function getBaseUrl () {
    return baseUrlOf[`${process.env.TESTCAFE_ENV}`];
}