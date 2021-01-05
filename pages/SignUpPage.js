import { stat } from 'fs';
import {t, Selector } from 'testcafe';

class SignUpPage {

    constructor(){
        this.supplierCheckBox = Selector('label').withText('Supplier');
        this.distributorCheckBox = Selector('label').withText('Distributor');
        this.retailerCheckBox = Selector('label').withText('Retailer');
        this.companyNameLabel = Selector('label').withAttribute('for', 'companySearch');
        this.companyNameInput = Selector('#companySearch');
        this.yourName = Selector('input').withAttribute('aria-label', 'Your Name');
        this.email = Selector('input').withAttribute('aria-label', 'Email Address');
        this.emailLabel = Selector('label').withText('Email Address');
        this.password = Selector('input').withAttribute('aria-label', 'Password');
        this.passwordLabel = Selector('label').withText('Password');
        this.signUpButton = Selector('div').withExactText('SIGN UP');
        this.paymenyDetailsHeader = Selector('p').withText('Payment Details');
        this.paymentAddress = Selector('input').withAttribute('aria-label', 'Address Line 1');
        this.paymentCity = Selector('input').withAttribute('aria-label', 'City');
        this.paymentState = Selector('input').withAttribute('aria-label', 'State');
        this.paymentPostalCode = Selector('input').withAttribute('aria-label', 'Postal Code');
        this.phoneNumber = Selector('input').withAttribute('aria-label', 'Phone');
        this.cardNumber = Selector('input').withAttribute('name', 'cardnumber');
        this.mmyyCVC = Selector('input').withAttribute('name', 'exp-date');
        this.paymentPostal = Selector('input').withAttribute('name', 'postal');
        this.stripeIframe = Selector('iframe');
    }

    
    async selectRole(role){
            if(role == 'distributor'){
                await t.click(this.distributorCheckBox);
            }else if (role == 'supplier'){
                await t.click(this.supplierCheckBox);
            }else if (role == 'retailer'){
                await t.click(this.retailerCheckBox);
            }
    }

    async fulFillUserForm(yourName, email, password){
        await t.typeText(this.yourName, yourName);
        await t.typeText(this.email, email);
        await t.typeText(this.password, password);
    }

    async createNewClient(companyName, yourName, email, password){
        await t.typeText(this.companyNameInput, companyName);
        await this.fulFillUserForm(yourName, email, password);
        await t.click(this.signUpButton);
    }
        
    async createNewSupplier(companyName, yourName, email, password){
        await t.typeText(this.companyNameInput, companyName);
        await this.fulFillUserForm(yourName, email, password);
    }

    async insertPaymentDetails(adress, city, state, post, phone, cardNumber, CVC, paymentPostal){
        await t
            .typeText(this.paymentAddress, adress)
            .typeText(this.paymentCity, city)
            .typeText(this.paymentState, state)
            .typeText(this.paymentPostalCode, post)
            .typeText(this.phoneNumber, phone)
            .switchToIframe(this.stripeIframe)
            .typeText(this.cardNumber, cardNumber)
            .typeText(this.mmyyCVC, CVC)
        if(paymentPostal !== ''){
            await t.typeText(this.paymentPostal, paymentPostal)
        }
        await t.switchToMainWindow();
    }

    async switchToStripeIframe(){
        await t
            .switchToIframe(this.stripeIframe);
    }

    async clickSignUpButton(){
        await
            t.click(this.signUpButton);
    }

    async verifyCardIsInvalid(){
        await t
            .switchToIframe(this.stripeIframe)
            .expect(this.cardNumber.hasClass('is-invalid')).ok();
    }

}

export default new SignUpPage();