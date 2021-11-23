import { useState } from "react";
import PropTypes from 'prop-types';

export default function Form({onLocationSearch}) {

    const [location, setLocation] = useState("");
    const [numOfDays, setNumOfDays] = useState(null);
    const [isValid, setIsValid] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(location === "" || !location) {
            setIsValid(false);
            setErrorMsg("Location is Required!")
            return;
        } else if(numOfDays > 6 || numOfDays < 1 | numOfDays === null){
            setIsValid(false);
            setErrorMsg("You can only min of 1 and max of 6 days weather forecast!");
            return;
        } else {
            setIsValid(true);
            onLocationSearch(location, numOfDays);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Weather Forecast</h3>
                <div className="form-floating mb-3">
                    <input type="search" value={location} onChange={e => setLocation(e.target.value)} 
                        className="form-control" id="cityFormControl" placeholder="city" required/>
                    <label htmlFor="cityFormControl">Enter the location</label>
                </div>
                <input type="number" value={numOfDays} onChange={e=>setNumOfDays(e.target.value)}
                     className='form-control' id="dayslimit" placeholder="Enter number of days (max 6)" max="6" required/>
                <br />
                <button type='submit' onClick={handleSubmit} className='btn btn-primary'>Search</button>
            </form>
            <br />
            {!isValid && <div className='alert alert-danger'>{errorMsg}</div>}
        </div>
    )
}

Form.propTypes = {
    onLocationSearch: PropTypes.func.isRequired
}
