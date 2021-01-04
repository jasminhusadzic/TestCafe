import { stat } from 'fs';
import {t, Selector } from 'testcafe';

class SignUpPage {

    constructor(){
        this.supplierCheckBox = Selector('input').withAttribute('id', 'example-supplier-checkbox-id');
        this.distributorCheckBox = Selector('label').withText('Distributor');
        this.retailerCheckBox = Selector('label').withText('Retailer');
        // this.retailerCompanyName = Selector('input').withAttribute('id', 'example-company-id');
        this.companyNameLabel = Selector('label').withAttribute('for', 'companySearch');
        this.companyNameInput = Selector('#companySearch');
        this.supplierCompanyName = Selector('input').withAttribute('id', 'example-supplier-id');
        this.yourName = Selector('input').withAttribute('aria-label', 'Your Name');
        this.email = Selector('input').withAttribute('aria-label', 'Email Address');
        this.password = Selector('input').withAttribute('aria-label', 'Password');
        this.signUpButton = Selector('div').withExactText('SIGN UP');
        this.paymenyDetailsHeader = Selector('h1').withAttribute('id', 'example-payment-id');
        this.paymentAddress = Selector('input').withAttribute('id', 'example-adress-id');
        this.paymentCity = Selector('input').withAttribute('id', 'example-city-id');
        this.paymentState = Selector('input').withAttribute('id', 'example-state-id');
        this.paymentPostalCode = Selector('input').withAttribute('id', 'example-post-id');
        this.phoneNumber = Selector('input').withAttribute('id', 'example-phone-id');
        this.cardNumber = Selector('input').withAttribute('id', 'example-ccnum-id');
        this.mmyyCVC = Selector('input').withAttribute('id', 'example-cvc-id');
    }

    
    async selectRole(role){
            if(role == 'distributor'){
                await t.click(this.distributorCheckBox);
            }else if (role == 'supplier'){
                await t.click(this.distributorCheckBox);
            }else if (role == 'retailer'){
                await t.click(this.retailerCheckBox);
            }
    }

    async fulFillUserForm(yourName, email, password){
        await t.typeText(this.yourName, yourName);
        await t.typeText(this.email, email);
        await t.typeText(this.password, password);
    }

    async createNewDistributor(companyName, yourName, email, password){
        await t.typeText(this.companyNameInput, companyName);
        await this.fulFillUserForm(yourName, email, password);
        await t.click(this.signUpButton);
    }

    async createNewRetailer(companyName, yourName, email, password){
        await t.typeText(this.companyNameInput, companyName);
        await this.fulFillUserForm(yourName, email, password);
        await t.click(this.signUpButton);
    }
        
    async createNewSupplier(){
        await 
            t.typeText(this.retailerCompanyName, companyName);
            this.fulFillUserForm(yourName, email, password);
    }

    async insertPaymentDetails(adress, city, state, post, phone, cardNumber, CVC){
        await
            t.typeText(this.paymentAddress, adress);
            t.typeText(this.paymentCity, city);
            t.typeText(this.paymentState, state);
            t.typeText(this.paymentPostalCode, post);
            t.typeText(this.phoneNumber, phone);
            t.typeText(this.cardNumber, cardNumber);
            t.typeText(this.mmyyCVC, CVC);
    }

    async clickSignUpButton(){
        await
            t.click(this.signUpButton);
    }

}

export default new SignUpPage();