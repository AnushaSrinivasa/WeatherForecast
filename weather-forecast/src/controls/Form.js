import { useState } from "react";
import PropTypes from 'prop-types';

export default function Form({onLocationSearch, setFormValidation, setFormErrorMsg}) {

    const [location, setLocation] = useState("");
    const [numOfDays, setNumOfDays] = useState(null);
    
    /**
     * On Search function validates the input data and set error alert
     * @param {event} e 
     * @returns 
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        if(location === "" || !location) {
            setFormValidation(false);
            setFormErrorMsg("Location is Required!")
            return;
        } else if(numOfDays > 6 || numOfDays < 1 | numOfDays === null){
            setFormValidation(false);
            setFormErrorMsg("Please enter min of 1 and max of 6 days for weather forecast!");
            return;
        } else {
            setFormValidation(true);
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
        </div>
    )
}

Form.propTypes = {
    onLocationSearch: PropTypes.func.isRequired
}
