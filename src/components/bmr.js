import React, { useState } from 'react';
import './bmr.css';

function Bmr() {
    const [gender, setGender] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');
    const [heightFeet, setHeightFeet] = useState('');
    const [heightInches, setHeightInches] = useState('');
    const [heightCm, setHeightCm] = useState('');
    const [activity, setActivity] = useState('');
    const [calculationMethod, setCalculationMethod] = useState('imperial');
    const [bmrCalc, setBmrCalc] = useState('');
    const [calCalc, setCalCalc] = useState('');
    const [error, setError] = useState('');

    const calculateBMR = () => {
        if (calculationMethod === 'imperial') {
            if (gender === '' || weight === '' || age === '' || heightFeet === '' || heightInches === '') {
                setError(<div className='error'>All Fields are mandatory</div>);
                return;
            }
            else {
                setError('');
            }
        }
        if (calculationMethod === 'metric') {
            if (gender === '' || weight === '' || age === '' || heightCm === '') {
                setError(<div className='error'>All Fields are mandatory</div>);
                return;
            }
            else {
                setError('');
            }
        }

        let bmr = '';
        let height = ((heightFeet * 30.48) + (heightInches * 2.54));

        if (gender === '1' && calculationMethod === 'imperial') {
            bmr = 655.1 + (4.35 * weight) + (4.7 * height) - (4.7 * age);
            setBmrCalc(bmr);
        }
        else if (gender === '2' && calculationMethod === 'imperial') {
            bmr = 66 + (6.2 * weight) + (12.7 * height) - (6.76 * age);
            setBmrCalc(bmr);
        }

        else if (gender === '1' && calculationMethod === 'metric') {
            bmr = 655 + (9.563 * weight) + (1.850 * heightCm) - (4.676 * age);
            setBmrCalc(bmr);

        }
        else if (gender === '2' && calculationMethod === 'metric') {
            bmr = 66.5 + (13.75 * weight) + (5.003 * heightCm) - (6.755 * age);
            setBmrCalc(bmr);
        }

    }

    const calculateCal = () => {
        let calories = bmrCalc * activity;
        if (activity === '') {
            setError('');
            setError(<div className='error'>Please select your activity</div>);
        }
        else if (activity !== '') {
            setError('');
            setCalCalc(calories);
        }
    }

    return (
        <div id="bmrcalc">
            <div className="form">
                <h2>BMR &amp; Daily Calorie Calculator</h2>
                {error}
                <div className="workout">
                    <div className="inputwrap">
                        <label className="label">Select Calculation Method</label>
                        <select className="activity" name="activity" value={calculationMethod} onChange={(e) => {
                            setBmrCalc('');
                            setCalCalc('');
                            setActivity('');
                            setCalculationMethod(e.target.value)
                        }}>
                            <option value="imperial">Imperial</option>
                            <option value="metric">Metric</option>
                        </select>
                    </div>
                    <br />
                </div>
                <div className="inputwrap">
                    <label className="label">Gender</label>
                    <label><input type="radio" onChange={(e) => setGender(e.target.value)} className="genderF" name="gender" value="1" />Female</label>
                    <label> <input type="radio" onChange={(e) => setGender(e.target.value)} className="genderM" name="gender" value="2" />Male</label>
                </div>
                <div className="inputwrap">
                    {calculationMethod === 'imperial' && (<label className="label">Weight in Pounds</label>)}
                    {calculationMethod === 'metric' && (<label className="label">Weight in KG</label>)}
                    <input type="number" name="weight" className="weight" min="0" max="999" value={weight} onChange={(e) => setWeight(e.target.value)} />
                </div>
                <div className="inputwrap">
                    {calculationMethod === 'imperial' && (
                        <div>
                            <label className="label">Height in feet and inches</label>
                            <input type="number" name="heightFeet" className="heightFeet" min="0" max="8" value={heightFeet} onChange={(e) => setHeightFeet(e.target.value)} />
                            <input type="number" name="heightInches" className="heightInches" min="0" max="11" value={heightInches} onChange={(e) => setHeightInches(e.target.value)} />
                        </div>
                    )}
                    {calculationMethod === 'metric' && (
                        <div>
                            <label className="label">Height in centimeter</label>
                            <input type="number" name="heightCm" className="heightCm" min="0" max="8" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} />
                        </div>
                    )}
                </div>
                <div className="inputwrap">
                    <label className="label">Age in years</label>
                    <input type="number" className="age" name="age" min="0" max="120" value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <button type="button" onClick={() => calculateBMR()}>Calculate BMR</button>
                {bmrCalc && (<div className='result'>{bmrCalc}</div>)}
                {bmrCalc && (
                    <div className="workout">
                        <div className="inputwrap">
                            <label className="label">Workout in a Week</label>
                            <select className="activity" name="activity" value={activity} onChange={(e) => setActivity(e.target.value)}>
                                <option value="">Select your Activity</option>
                                <option value="1.2">Sedentary (Very little or no exercise, and desk job)</option>
                                <option value="1.375">Lightly Active (Light exercise 1 to 3 days per week)</option>
                                <option value="1.55">Moderately Active (Moderate exercise 3 to 5 days per week)</option>
                                <option value="1.725">Very Active (Heavy exercise 6 to 7 days per week)</option>
                                <option value="1.9">Extremely Active (Very intense exercise, and physical job, exercise multiple times per day)</option>
                            </select>
                        </div>
                        <button type="button" onClick={() => calculateCal()} >Calculate Calories</button>
                        {calCalc && (<div className='result'>{calCalc}</div>)}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Bmr;
