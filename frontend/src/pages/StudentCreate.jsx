import { Link, useNavigate } from "react-router-dom";
import {  useState } from "react";
import axios from "axios"
import Loading from "../components/Loading";

function StudentCreate() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [inputErrorList, setInputErrorList] = useState({})
    const [student, setStudent] = useState({
        name: '',
        nis: '',
        email: '',
        phone: '',
    })

    const handleInput = (e) => {
        e.persist();
        setStudent({...student, [e.target.name]: e.target.value});
    }

    const saveStudent = (e) => {
        e.preventDefault();

        setLoading(true);

        const data = {
            name: student.name,
            nis: student.nis,
            email: student.email,
            phone: student.phone,
        }

        axios.post(`http://127.0.0.1:8000/api/students`, data).then(res => {
            alert(res.data.message);
            navigate('/students')
            setLoading(false);
        })
        .catch(function(error) {

            if(error.response) {
                if(error.response.status === 422) {
                    setInputErrorList(error.response.data.errors)
                    setLoading(false);
                }

                if(error.response.status === 500) {
                    alert(error.response.data)
                    setLoading(false);
                }
            }
        });
    }

    if(loading) {
        return(
            <div>
                <Loading />
            </div>
        )
    }

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>
                  Add Student
                  <Link to="/students" className="btn btn-danger float-end">
                    Back
                  </Link>
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={saveStudent}>
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
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentCreate;
