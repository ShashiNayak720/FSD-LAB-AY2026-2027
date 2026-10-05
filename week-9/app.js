const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const dbName = "studentDB";

async function main() {
    try {
        // Connect to MongoDB
        await client.connect();
        console.log("Connected to MongoDB successfully!");

        const db = client.db(dbName);
        const collection = db.collection("students");

        // Student records
        const students = [
            {
                studentId: 101,
                name: "Anita",
                department: "CSE",
                subjects: [
                    { name: "DBMS", marks: 85, grade: "A" },
                    { name: "AI", marks: 90, grade: "A+" },
                    { name: "Web Development", marks: 78, grade: "B+" }
                ]
            },
            {
                studentId: 102,
                name: "Rahul",
                department: "CSE",
                subjects: [
                    { name: "DBMS", marks: 75, grade: "B+" },
                    { name: "AI", marks: 82, grade: "A" },
                    { name: "Web Development", marks: 88, grade: "A" }
                ]
            },
            {
                studentId: 103,
                name: "Priya",
                department: "AIML",
                subjects: [
                    { name: "DBMS", marks: 92, grade: "A+" },
                    { name: "AI", marks: 95, grade: "A+" },
                    { name: "Web Development", marks: 89, grade: "A" }
                ]
            },
            {
                studentId: 104,
                name: "Kiran",
                department: "AIML",
                subjects: [
                    { name: "DBMS", marks: 68, grade: "B" },
                    { name: "AI", marks: 74, grade: "B+" },
                    { name: "Web Development", marks: 80, grade: "A" }
                ]
            }
        ];

        // Clear old records
        await collection.deleteMany({});

        // Insert student records
        await collection.insertMany(students);

        console.log("Student records inserted successfully!");

        // Final Grade Summary
        const result = await collection.aggregate([
            {
                $unwind: "$subjects"
            },
            {
                $group: {
                    _id: "$studentId",
                    name: { $first: "$name" },
                    department: { $first: "$department" },

                    totalMarks: {
                        $sum: "$subjects.marks"
                    },

                    averageMarks: {
                        $avg: "$subjects.marks"
                    },

                    highestMarks: {
                        $max: "$subjects.marks"
                    },

                    lowestMarks: {
                        $min: "$subjects.marks"
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    studentId: "$_id",
                    name: 1,
                    department: 1,
                    totalMarks: 1,
                    averageMarks: {
                        $round: ["$averageMarks", 2]
                    },
                    highestMarks: 1,
                    lowestMarks: 1
                }
            },
            {
                $sort: {
                    averageMarks: -1
                }
            }
        ]).toArray();

        // Display final result
        console.log("\nFinal Student Grade Summary:");
        console.table(result);

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await client.close();
    }
}

main();