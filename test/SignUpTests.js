import { expect } from "chai";
import { t } from "testcafe";
import ProfilePage from "../pages/ProfilePage";
import SignUpPage from "../pages/SignUpPage"


fixture `Creating new users in roles as Supplier, Distributor and Retailer`
    .page  `baseUrl`

    test('Navigate to SignUp and create new Distributor then verify Distributor is created', async () => {
        await SignUpPage.selectRole('distributor');
        await t.expect(SignUpPage.distributorCompanyName.getAttribute('placeholder')).eql('Distributor Company Name', 'Placeholder should be matched');
        await SignUpPage.createNewDistributor('Distributor Name', 'Jasmin Husadzic', 'myemail@email.com', 'passworD12#');
        await t.expect(ProfilePage.getProfileTitle()).eql('Distributor Name', 'Page title should matched');
    })

    test('Navigate to SignUp and create new Distributor with invalid email then verify error message appear', async () => {
        await SignUpPage.selectRole('distributor');
        await t.expect(SignUpPage.distributorCompanyName.getAttribute('placeholder')).eql('Distributor Company Name', 'Placeholder should be matched');
        await SignUpPage.createNewDistributor('Distributor Name', 'Jasmin Husadzic', 'email.com', 'passworD12#');
        await t.expect(SignUpPage.email.getAttribute('placeholder')).eql('Email Address not valid', 'Expect valid email format');
    })

    test('Navigate to SignUp and create new Distributor with empty password input then verify error message appear', async () => {
        await SignUpPage.selectRole('distributor');
        await t.expect(SignUpPage.distributorCompanyName.getAttribute('placeholder')).eql('Distributor Company Name', 'Placeholder should be matched');
        await SignUpPage.createNewDistributor('Distributor Name', 'Jasmin Husadzic', 'myemail@email.com', '');
        await t.expect(SignUpPage.password.getAttribute('placeholder')).eql('Password should not be empty', 'Expect valid password');
    })

    test('Navigate to SignUp and create new Retailer then verify Distributor is created', async () => {
        await SignUpPage.selectRole('retailer');
        await t.expect(SignUpPage.retailerCheckBox.getAttribute('placeholder')).eql('Retailer Company Name', 'Placeholder should be matched');
        await SignUpPage.createNewRetailer('Retailer Name', 'Jasmin Husadzic', 'myemail@email.com', '');
        await t.expect(ProfilePage.getProfileTitle()).eql('Retaile Name', 'Page title should matched');
    })

