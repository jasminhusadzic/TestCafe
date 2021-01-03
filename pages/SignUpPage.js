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

    async createNewSupplier()

}

export default new SignUpPage();