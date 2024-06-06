# To-Do List Application

Welcome to the To-Do List application, a simple yet effective tool for managing your tasks and staying productive.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Core Algorithms](#core-algorithms)
- [Challenges Overcome](#challenges-overcome)
- [Learnings](#learnings)
- [Future Improvements](#future-improvements)
- [Contact](#contact)

## Introduction

This project was inspired by the need for a straightforward and user-friendly application to manage daily tasks. The To-Do List application allows users to add, edit, delete, and filter tasks, helping them stay organized and productive.

## Features

- **Easy Task Management**: Add, edit, and delete tasks effortlessly.
- **Filter Tasks**: View tasks by status: active, completed, or all tasks.
- **Organize by Date and Time**: Schedule tasks with specific dates and times.
- **Responsive Design**: Accessible on various devices, including desktops, tablets, and mobile phones.

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Flask (Python)
- **Database**: SQLite (can be upgraded to PostgreSQL or other databases)
- **Templating Engine**: Jinja2
- **Styling**: Custom CSS

## Architecture

The application follows a simple MVC (Model-View-Controller) architecture:

- **Model**: Defines the structure of tasks stored in the database.
- **View**: HTML templates rendered using Jinja2.
- **Controller**: Flask routes that handle HTTP requests and responses.

## Installation

To run this application locally, follow these steps:

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/todo-list-app.git
    cd todo-list-app
    ```

2. **Create a Virtual Environment**:
    ```bash
    python3 -m venv venv
    source venv/bin/activate   # On Windows use `venv\Scripts\activate`
    ```

3. **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4. **Run the Application**:
    ```bash
    flask run
    ```

5. Open your browser and navigate to `http://127.0.0.1:5000` to see the application in action.

## Usage

### Adding a Task

- Fill in the task details in the input fields provided.
- Click the "Add Task" button to save the task.

### Editing a Task

- Click the edit icon (✏️) next to the task you want to edit.
- Update the task details and click "Save".

### Deleting a Task

- Click the delete icon (🗑️) next to the task you want to delete.

### Filtering Tasks

- Use the filter buttons to view all tasks, active tasks, or completed tasks.

## Core Algorithms

### Task Filtering

```javascript
function filterTasks(filter) {
    // Logic to filter tasks based on their status (all, active, completed)
}

