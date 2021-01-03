import { stat } from 'fs';
import {t, Selector } from 'testcafe';

class SignUpPage {

    constructor(){
        this.supplierCheckBox = Selector('input').withAttribute('id', 'example-supplier-checkbox-id');
        this.distributorCheckBox = Selector('input').withAttribute('id', 'example-distributor-checkbox-id');
        this.retailerCheckBox = Selector('input').withAttribute('id', 'example-retailer-checkbox-id');
        this.retailerCompanyName = Selector('input').withAttribute('id', 'example-company-id');
        this.distributorCompanyName = Selector('input').withAttribute('id', 'example-distributor-id');
        this.supplierCompanyName = Selector('input').withAttribute('id', 'example-supplier-id');
        this.yourName = Selector('input').withAttribute('id', 'example-name-id');
        this.email = Selector('input').withAttribute('id', 'example-email-id');
        this.password = Selector('input').withAttribute('id', 'example-password-id');
        this.signUpButton = Selector('button').withAttribute('id', 'example-button-id');
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
        await
            t.typeText(this.yourName, yourName);
            t.typeText(this.email, email);
            t.typeText(this.password, password);
    }

    async createNewDistributor(companyName, yourName, email, password){
        await 
            t.typeText(this.distributorCompanyName, companyName);
            this.fulFillUserForm(yourName, email, password);
            t.click(this.signUpButton);
    }

    async createNewRetailer(companyName, yourName, email, password){
        await 
            t.typeText(this.retailerCompanyName, companyName);
            this.fulFillUserForm(yourName, email, password);
            t.click(this.signUpButton);
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