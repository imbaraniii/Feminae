import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormsPage = () => {
  const [gender, setGender] = useState("");
  const [reproductiveStage, setReproductiveStage] = useState("");
  const [consent, setConsent] = useState(false);
  const navigate = useNavigate();

  const toggleReproductiveHealthDetails = (stage) => {
    setReproductiveStage(stage);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleConsentValidation = (e) => {
    if (!consent) {
      e.preventDefault();
      alert("Please agree to the Terms of Service and Privacy Policy before submitting.");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#8B3C3C] to-[#4D2C2C] p-6 text-white">
      <h1 className="text-center text-3xl font-bold mb-6">Health App Onboarding</h1>
      <form
        className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg text-black"
        onSubmit={handleConsentValidation}
      >
        {/* Basic Information */}
        <h2 className="text-xl font-bold mb-4">Basic Information</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 rounded-lg border border-[#8B3C3C]"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dob" className="block mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            className="w-full p-2 rounded-lg border border-[#8B3C3C]"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block mb-2">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            className="w-full p-2 rounded-lg border border-[#8B3C3C]"
            value={gender}
            onChange={handleGenderChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Health Profile */}
        <h2 className="text-xl font-bold mb-4">Health Profile</h2>
        <div className="mb-4">
          <label htmlFor="height" className="block mb-2">
            Height (cm)
          </label>
          <input
            type="number"
            id="height"
            name="height"
            className="w-full p-2 rounded-lg border border-[#8B3C3C]"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="weight" className="block mb-2">
            Weight (kg)
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            className="w-full p-2 rounded-lg border border-[#8B3C3C]"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="conditions" className="block mb-2">
            Existing Medical Conditions
          </label>
          <textarea
            id="conditions"
            name="conditions"
            className="w-full p-2 rounded-lg border border-[#8B3C3C]"
            placeholder="List any conditions"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="medications" className="block mb-2">
            Current Medications
          </label>
          <textarea
            id="medications"
            name="medications"
            className="w-full p-2 rounded-lg border border-[#8B3C3C]"
            placeholder="List medications"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="allergies" className="block mb-2">
            Allergies
          </label>
          <textarea
            id="allergies"
            name="allergies"
            className="w-full p-2 rounded-lg border border-[#8B3C3C]"
            placeholder="List allergies"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="lifestyle" className="block mb-2">
            Lifestyle Habits
          </label>
          <textarea
            id="lifestyle"
            name="lifestyle"
            className="w-full p-2 rounded-lg border border-[#8B3C3C]"
            placeholder="e.g., Smoking, Alcohol"
          ></textarea>
        </div>
      {/* Reproductive Health Section */}
{gender === "female" && (
  <div>
    <h2 className="text-xl font-bold mb-4">Reproductive Health Stage</h2>
    <div className="mb-4">
      <label htmlFor="reproductive-stage" className="block mb-2">
        Which stage best describes you?
      </label>
      <select
        id="reproductive-stage"
        name="reproductive-stage"
        className="w-full p-2 rounded-lg border border-[#8B3C3C]"
        value={reproductiveStage}
        onChange={(e) => toggleReproductiveHealthDetails(e.target.value)}
      >
        <option value="not-applicable">Not Applicable</option>
        <option value="menstruating">Menstruating</option>
        <option value="pregnant">Pregnant</option>
        <option value="postpartum">Postpartum</option>
        <option value="menopausal">Menopausal</option>
      </select>
    </div>
    {reproductiveStage === "menstruating" && (
      <div>
        <h3 className="font-bold mb-2">Menstrual Cycle Information</h3>
        <div className="mb-4">
          <label htmlFor="cycle-length" className="block mb-2">
            Average Cycle Length (Days)
          </label>
          <input
            type="number"
            id="cycle-length"
            name="cycle-length"
            className="w-full p-2 rounded-lg border border-[#8B3C3C]"
            placeholder="e.g., 28"
            min="1"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="last-period" className="block mb-2">
            Date of Last Period
          </label>
          <input
            type="date"
            id="last-period"
            name="last-period"
            className="w-full p-2 rounded-lg border border-[#8B3C3C]"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="cycle-irregularities" className="block mb-2">
            Cycle Irregularities (if any)
          </label>
          <textarea
            id="cycle-irregularities"
            name="cycle-irregularities"
            className="w-full p-2 rounded-lg border border-[#8B3C3C]"
            placeholder="Any irregularities?"
          ></textarea>
        </div>
      </div>
    )}
      {reproductiveStage === "pregnant" && (
        <div>
          <h3 className="font-bold mb-2">Pregnancy Information</h3>
          <div className="mb-4">
            <label htmlFor="delivery-date" className="block mb-2">
              Expected Delivery Date
            </label>
            <input
              type="date"
              id="delivery-date"
              name="delivery-date"
              className="w-full p-2 rounded-lg border border-[#8B3C3C]"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="pregnancy-complications" className="block mb-2">
              Any complications during pregnancy?
            </label>
            <textarea
              id="pregnancy-complications"
              name="pregnancy-complications"
              className="w-full p-2 rounded-lg border border-[#8B3C3C]"
              placeholder="e.g., Gestational diabetes"
            ></textarea>
          </div>
        </div>
      )}

      {reproductiveStage === "postpartum" && (
        <div>
          <h3 className="font-bold mb-2">Postpartum Information</h3>
          <div className="mb-4">
            <label htmlFor="weeks-postpartum" className="block mb-2">
              How many weeks postpartum are you?
            </label>
            <input
              type="number"
              id="weeks-postpartum"
              name="weeks-postpartum"
              className="w-full p-2 rounded-lg border border-[#8B3C3C]"
              placeholder="e.g., 6"
              min="1"
              max="52"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="postpartum-issues" className="block mb-2">
              Any postpartum issues?
            </label>
            <textarea
              id="postpartum-issues"
              name="postpartum-issues"
              className="w-full p-2 rounded-lg border border-[#8B3C3C]"
              placeholder="e.g., Postpartum depression"
            ></textarea>
          </div>
        </div>
      )}
      {reproductiveStage === "menopausal" && (
        <div>
          <h3 className="font-bold mb-2">Menopausal Information</h3>
          <div className="mb-4">
            <label htmlFor="menopausal-symptoms" className="block mb-2">
              Symptoms Experienced
            </label>
            <textarea
              id="menopausal-symptoms"
              name="menopausal-symptoms"
              className="w-full p-2 rounded-lg border border-[#8B3C3C]"
              placeholder="List symptoms"
            ></textarea>
          </div>
        </div>
      )}
    </div>
  )}


        {/* Preferences */}
        <h2 className="text-xl font-bold mb-4">Preferences</h2>
        <div className="mb-4">
          <label htmlFor="diet" className="block mb-2">
            Dietary Preferences
          </label>
          <input
            type="text"
            id="diet"
            name="diet"
            className="w-full p-2 rounded-lg border border-[#8B3C3C]"
            placeholder="e.g., Vegan, Gluten-free"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="notifications" className="block mb-2">
            Notification Preferences
          </label>
          <select
            id="notifications"
            name="notifications"
            className="w-full p-2 rounded-lg border border-[#8B3C3C]"
          >
            <option value="all">All Notifications</option>
            <option value="essential">Essential Only</option>
            <option value="none">None</option>
          </select>
        </div>

        {/* Emergency Information */}
        <h2 className="text-xl font-bold mb-4">Emergency Information</h2>
        <div className="mb-4">
          <label htmlFor="emergency-contact" className="block mb-2">
            Emergency Contact
          </label>
          <input
            type="text"
            id="emergency-contact"
            name="emergency-contact"
            className="w-full p-2 rounded-lg border border-[#8B3C3C]"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="blood-group" className="block mb-2">
            Blood Group
          </label>
          <select
            id="blood-group"
            name="blood-group"
            className="w-full p-2 rounded-lg border border-[#8B3C3C]"
            required
          >
            <option value="a+">A+</option>
            <option value="a-">A-</option>
            <option value="b+">B+</option>
            <option value="b-">B-</option>
            <option value="ab+">AB+</option>
            <option value="ab-">AB-</option>
            <option value="o+">O+</option>
            <option value="o-">O-</option>
          </select>
        </div>

       {/* Consent */}
      <div className="text-center mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            className="mr-2"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          I agree to the{" "}
          <span className="text-blue-500 underline cursor-pointer">
            Terms of Service and Privacy Policy
          </span>.
        </label>
      </div>


        <button
          type="submit"
          className="w-full p-3 bg-gradient-to-r from-[#8B3C3C] to-[#B76E6E] text-white rounded-lg shadow-md hover:scale-105 transition-all duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormsPage;
