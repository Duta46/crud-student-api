import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

function Student() {

    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState([true])

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/students`).then(res => {
            setStudents(res.data.students);
            setLoading(false);
        });
    }, [])

    if(loading) {
        return(
            <div>
                <Loading />
            </div>
        )
    }

    const deleteStudent = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting...";

        axios.delete(`http://127.0.0.1:8000/api/students/${id}`)
        .then(res => {
            alert(res.data.message);
            thisClicked.closest("tr").remove();
        })
        .catch(error => {
            if (error.response) {
                if (error.response.status === 404) {
                    alert(error.response.data.message);
                } else {
                    alert("An error occurred");
                }
            }
            setLoading(false);
        });
    }

    let StudentDetails = "";
    StudentDetails = students.map( (item, index) => {
        return (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.nis}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                    <Link to={`/students/${item.id}/edit`} className="btn btn-success">Edit</Link>
                </td>
                <td>
                    <Link type="button" onClick={(e) => deleteStudent(e, item.id)} className="btn btn-danger">Delete</Link>
                </td>
            </tr>
        )
    })

    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Student List</h4>
                            <Link to="/students/create" className="btn btn-primary float-end">Add Student</Link>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Nis</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {StudentDetails}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Student;