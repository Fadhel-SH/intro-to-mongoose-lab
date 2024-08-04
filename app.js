const prompt = require('prompt-sync')();
const mongoose = require('mongoose');
const connectDB = require('./config');
const Customer = require('./models/Customer');

connectDB();

const main = async () => {
    while (true) {
        console.log('Welcome to the CRM');
        console.log('What would you like to do?');
        console.log('1. Create a customer');
        console.log('2. View all customers');
        console.log('3. Update a customer');
        console.log('4. Delete a customer');
        console.log('5. Quit');

        const choice = prompt('Number of action to run: ');

        switch (choice) {
            case '1':
                try {
                    const name = prompt('Enter customer name: ');
                    const age = prompt('Enter customer age: ');
                    const newCustomer = new Customer({ name, age });
                    await newCustomer.save();
                    console.log('Customer created');
                } catch (err) {
                    console.error('Error creating customer:', err);
                }
                break;
            case '2':
                try {
                    const customers = await Customer.find();
                    console.log('Below is a list of customers:');
                    customers.forEach(customer => {
                        console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`);
                    });
                } catch (err) {
                    console.error('Error reading customers:', err);
                }
                break;
            case '3':
                try {
                    const customers = await Customer.find();
                    console.log('Below is a list of customers:');
                    customers.forEach(customer => {
                        console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`);
                    });
                    const updateId = prompt('Copy and paste the id of the customer you would like to update here: ');
                    const updateName = prompt('What is the customer\'s new name? ');
                    const updateAge = prompt('What is the customer\'s new age? ');
                    await Customer.findByIdAndUpdate(updateId, { name: updateName, age: updateAge });
                    console.log('Customer updated');
                } catch (err) {
                    console.error('Error updating customer:', err);
                }
                break;
            case '4':
                try {
                    const customers = await Customer.find();
                    console.log('Below is a list of customers:');
                    customers.forEach(customer => {
                        console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`);
                    });
                    const deleteId = prompt('Copy and paste the id of the customer you would like to delete here: ');
                    await Customer.findByIdAndDelete(deleteId);
                    console.log('Customer deleted');
                } catch (err) {
                    console.error('Error deleting customer:', err);
                }
                break;
            case '5':
                mongoose.connection.close();
                console.log('Exiting the application');
                process.exit(0);
            default:
                console.log('Invalid choice, please try again.');
        }
    }
};

// Graceful shutdown
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('MongoDB connection closed');
        process.exit(0);
    });
});

main();