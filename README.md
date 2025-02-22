# Contents

- [Installation](#installation)
- [Usage](#usage)
- [Database Schema](#database-schema)
- [Features](#features)
- [Bonus Features](#bonus-features)
- [License](#license)
- [Credits](#credits)

# Employee Tracker

A command-line tool using Node.js, Inquirer, and PostgreSQL to manage company employee data.

## Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/employee-tracker.git && cd employee-tracker
   ```
2. Install dependencies:
   ```bash
   npm install && npm i inquirer@8.2.4 pg
   ```
3. Set up the database:
   ```bash
   psql -U your_pg_username -f db/schema.sql
   ```

## Usage

Run the application:
```bash
node src/index.js
```
Options:
- View all departments, roles, employees
- Add a department, role, employee
- Update an employee role
- Exit

## Database Schema

### Tables:
- **department** (`id`, `name`)
- **role** (`id`, `title`, `salary`, `department_id`)
- **employee** (`id`, `first_name`, `last_name`, `role_id`, `manager_id`)

## Features

- View, add, and update employee records
- Manage company departments and roles

## Bonus Features

- Update employee managers
- View employees by manager/department
- Delete records

## License
MIT License.

## Credits
- Developed for the SQL: Employee Tracker challenge by edX Boot Camps LLC.
- ChatGPT and CoPilot for coding assistance and recommendations.
- EdX bootcamp course instructors and TAs for their guidance and support.