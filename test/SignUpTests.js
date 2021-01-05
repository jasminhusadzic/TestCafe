import uuidv4 from "uuid/v4";
import { t } from "testcafe";
import ProfilePage from "../pages/ProfilePage";
import SignUpPage from "../pages/SignUpPage"
import registrationData from "../data/registration"
import paymentData from "../data/payment"
import { getBaseUrl } from '../pages/helpers/baseUrl'

const emailAddressDistributor = `${uuidv4()}@brewoptix.com`;
const emailAddressRetailer = `${uuidv4()}@brewoptix.com`;
const emailAddressSupplier = `${uuidv4()}@brewoptix.com`;

fixture `Creating new users in roles as Supplier, Distributor and Retailer`
    .page(getBaseUrl())
    .beforeEach(async t => {
        await t
            .navigateTo(getBaseUrl() + 'session/sign-up')
            .maximizeWindow();
    })
    .afterEach(async t => {
        t
            ProfilePage.logoutUser();
    });

    test('Navigate to SignUp and create new Distributor then verify Distributor is created', async t => {
        await SignUpPage.selectRole('distributor');
        await t.expect(SignUpPage.companyNameLabel.innerText).eql('Distributor Company Name', 'Placeholder should be matched');
        await SignUpPage.createNewClient(registrationData.distributorName, registrationData.username, emailAddressDistributor, registrationData.password);
        await t.wait(15000);
        await t.expect(ProfilePage.userName.innerText).contains(registrationData.username, {timeout:15000});
    })

    test('Navigate to SignUp and create new Distributor with invalid email then verify error message appear', async () => {
        await SignUpPage.selectRole('distributor');
        await t.expect(SignUpPage.companyNameLabel.innerText).eql('Distributor Company Name', 'Placeholder should be matched');
        await SignUpPage.createNewClient(registrationData.distributorName, registrationData.username, 'invalidEmail', registrationData.password);
        await t.expect(SignUpPage.emailLabel.hasClass('error--text')).ok();
    })

    test('Navigate to SignUp and create new Distributor with invalid password input then verify error message appear', async () => {
        await SignUpPage.selectRole('distributor');
        await t.expect(SignUpPage.companyNameLabel.innerText).eql('Distributor Company Name', 'Placeholder should be matched');
        await SignUpPage.createNewClient(registrationData.distributorName, registrationData.username, emailAddressDistributor, 'test');
        await t.expect(SignUpPage.passwordLabel.hasClass('error--text')).ok();
    })

    test('Navigate to SignUp and create new Retailer then verify Retailer is created', async () => {
        await SignUpPage.selectRole('retailer');
        await t.expect(SignUpPage.companyNameLabel.innerText).eql('Retailer Company Name', 'Placeholder should be matched');
        await SignUpPage.createNewClient(registrationData.retailerName, registrationData.username, emailAddressRetailer, registrationData.password);
        await t.wait(15000);
        await t.expect(ProfilePage.userName.innerText).contains(registrationData.username, {timeout:15000});
    })

    test('Navigate to SignUp and create new Supplier then verify Supplier is created', async () => {
        await SignUpPage.selectRole('supplier');
        await t.expect(SignUpPage.companyNameLabel.innerText).eql('Supplier Name', 'Placeholder should be matched');
        await SignUpPage.createNewSupplier(registrationData.supplierName, registrationData.username, emailAddressSupplier, registrationData.password);
        await t.expect(SignUpPage.paymenyDetailsHeader.innerText).eql('Payment Details', 'Payment Details should appear');
        await SignUpPage.insertPaymentDetails(
            paymentData.address, 
            paymentData.city, 
            paymentData.state, 
            paymentData.postalCode, 
            paymentData.phone,
            paymentData.creditCard,
            paymentData.expiration,
            paymentData.postalCode);
        await SignUpPage.clickSignUpButton();
        await t.wait(25000);
        await t.expect(ProfilePage.userName.innerText).contains(registrationData.username, {timeout:25000});
    })

    test('Navigate to SignUp and create new Supplier with invalid Credit Card Number then verify error appear', async () => {
        await SignUpPage.selectRole('supplier');
        await t.expect(SignUpPage.companyNameLabel.innerText).eql('Supplier Name', 'Placeholder should be matched');
        await SignUpPage.createNewSupplier(registrationData.supplierName, registrationData.username, emailAddressSupplier, registrationData.password);
        await t.expect(SignUpPage.paymenyDetailsHeader.innerText).eql('Payment Details', 'Payment Details should appear');
        await SignUpPage.insertPaymentDetails(
            paymentData.address, 
            paymentData.city, 
            paymentData.state, 
            paymentData.postalCode, 
            paymentData.phone,
            "1234 5678 9101 1121",
            paymentData.expiration,
            '');
        await t.wait(15000);
        await SignUpPage.verifyCardIsInvalid();
    })


