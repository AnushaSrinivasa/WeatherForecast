import { useState } from "react";
import PropTypes from 'prop-types';

export default function Form({onLocationSearch, setFormValidation, setFormErrorMsg, resetResults}) {

    const [location, setLocation] = useState("");
    const [numOfDays, setNumOfDays] = useState(0);
    
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

    /**
     * Resets form data
     */
    const handleReset = () => {
        setLocation("");
        setNumOfDays(0);
        resetResults();
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
                <div className="form-floating mb-3">
                    <input type="number" value={numOfDays} onChange={e=>setNumOfDays(e.target.value)}
                     className='form-control' id="dayslimit" placeholder="Future days" max="6" required/>
                    <label htmlFor="dayslimit" className="form-label">Enter number of days (max 6)</label>
                </div>
                <br />
                <button type='submit' onClick={handleSubmit} className='btn btn-primary'>Search</button>                
                <button type='button' onClick={handleReset} className='btn btn-primary' style={{marginLeft:"1rem"}}>Reset</button>
            </form>
        </div>
    )
}

Form.propTypes = {
    onLocationSearch: PropTypes.func.isRequired
}
