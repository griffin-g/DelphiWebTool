const { Users } = require("./models");

(async () => {
  try {
    const hashedPassword = "hashedpass";

    // Create test user data
    const testUsers = [
      {
        first_name: "John",
        last_name: "Doe",
        email: "johndoe@example.com",
        password_hash: hashedPassword,
      },
      {
        first_name: "Jane",
        last_name: "Smith",
        email: "janesmith@example.com",
        password_hash: hashedPassword,
      },
    ];

    // Insert users into the database
    await Users.bulkCreate(testUsers);

    console.log("Test users created successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error creating test users:", error);
    process.exit(1);
  }
})();
