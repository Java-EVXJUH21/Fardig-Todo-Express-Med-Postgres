class Todo {
    constructor(description) {
        this.description = description;
        this.completed = false;
        this.completedDate = null;
        this.createdDate = new Date();
    }

    static convert(row) {
        return {
            id: row.id,
            description: row.description,
            completed: row.completed,
            completedDate: row.completeddate,
            createdDate: row.createddate
        }
    }
}

module.exports = Todo;
