import { useState } from "react";

export default function Form() {

    const [location, setLocation] = useState("");

    const handleSubmit = (e) => {
        if(location == "" || !location) {
            return;
        }
        e.preventDefault();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Weather Forecast</h3>
                <div className="form-floating mb-3">
                    <input type="search" value={location} onChange={e => setLocation(e.target.value)} className="form-control" id="cityFormControl" placeholder="city" />
                    <label htmlFor="cityFormControl">Enter the location</label>
                </div>
                <button type='submit' onClick={handleSubmit} className='btn btn-primary'>Search</button>
            </form>
        </div>
    )
}
