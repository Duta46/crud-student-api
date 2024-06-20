import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";

function StudentEdit() {
    let { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [inputErrorList, setInputErrorList] = useState({});
    const [student, setStudent] = useState({
        name: "",
        nis: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/students/${id}/edit`)
            .then(res => {
                if (res.data.student) {
                    setStudent(res.data.student);
                } else {
                    alert("Student not found");
                }
                setLoading(false);
            })
            .catch(() => {
                alert("Error fetching student data");
                setLoading(false);
            });
    }, [id]);

    const handleInput = (e) => {
        e.persist();
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const updateStudent = (e) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            name: student.name,
            nis: student.nis,
            email: student.email,
            phone: student.phone,
        };

        axios.put(`http://127.0.0.1:8000/api/students/${id}`, data)
            .then(res => {
                alert(res.data.message);
                setLoading(false);
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status === 422) {
                        setInputErrorList(error.response.data.errors);
                    } else if (error.response.status === 404) {
                        alert(error.response.data.message);
                    } else {
                        alert("An error occurred");
                    }
                }
                setLoading(false);
            });
    };

    if (loading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>
                                Edit Student
                                <Link to="/students" className="btn btn-danger float-end">
                                    Back
                                </Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={updateStudent}>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" name="name" value={student.name} onChange={handleInput} className="form-control" />
                                    <span className="text-danger">{inputErrorList.name}</span>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Nis</label>
                                    <input type="number" name="nis" value={student.nis} onChange={handleInput} className="form-control" />
                                    <span className="text-danger">{inputErrorList.nis}</span>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="text" name="email" value={student.email} onChange={handleInput} className="form-control" />
                                    <span className="text-danger">{inputErrorList.email}</span>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Phone</label>
                                    <input type="number" name="phone" value={student.phone} onChange={handleInput} className="form-control" />
                                    <span className="text-danger">{inputErrorList.phone}</span>
                                </div>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentEdit;
