"use client";

import { useState } from "react";
import { CountryDropdown } from "react-country-region-selector";

export default function Home() {
  const [stage, setStage] = useState(1);
  const [country, setCountry] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    country: "",
    email: "",
    phone: "",
    departureDate: "",
    returnDate: "",
    accommodation: "Space Hotel",
    specialRequests: "",
    healthDeclaration: false,
    emergencyContact: "",
    medicalConditions: "",
  });

  const onChangeCountry = (val) => {
    setCountry(val);
    setFormData((prev) => ({ ...prev, country: val }));
    validateField("country", val);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    validateField(name, fieldValue);
  };

  const validateField = (fieldName, value) => {
    let errorMessage = "";

    if (fieldName === "fullName" && !value.trim()) {
      errorMessage = "Full Name is required.";
    } else if (fieldName === "email" && !/\S+@\S+\.\S+/.test(value)) {
      errorMessage = "Please enter a valid email address.";
    } else if (fieldName === "phone" && !/^\d{10,15}$/.test(value)) {
      errorMessage = "Please enter a valid phone number.";
    } else if (
      (fieldName === "departureDate" || fieldName === "returnDate") &&
      !value
    ) {
      errorMessage = `Please provide a ${
        fieldName === "departureDate" ? "departure" : "return"
      } date.`;
    } else if (fieldName === "country" && !value) {
      errorMessage = "Please select a country.";
    } else if (fieldName === "healthDeclaration" && !value) {
      errorMessage = "Health declaration is required.";
    } else if (fieldName === "emergencyContact" && !value.trim()) {
      errorMessage = "Emergency Contact is required.";
    }

    setValidationErrors((prev) => ({
      ...prev,
      [fieldName]: errorMessage,
    }));
  };
  const validateStage = () => {
    if (stage === 1) {
      return (
        formData.fullName.trim() &&
        formData.dateOfBirth &&
        country &&
        formData.email.trim() &&
        /\S+@\S+\.\S+/.test(formData.email) &&
        /^\d{10,15}$/.test(formData.phone)
      );
    } else if (stage === 2) {
      return (
        formData.departureDate && formData.returnDate && formData.accommodation
      );
    } else if (stage === 3) {
      return formData.healthDeclaration && formData.emergencyContact.trim();
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = Object.values(validationErrors).every((error) => !error);
    if (isValid) {
      setStage(4);
      console.log(formData);
    } else {
      alert("Please fix validation errors before submitting.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 sm:p-12">
      <iframe
        className="absolute top-0 left-0 w-full h-full -z-10 scale-110"
        src="https://www.youtube.com/embed/wnhvanMdx4s?autoplay=1&mute=1&loop=1&playlist=wnhvanMdx4s"
        allow="autoplay; fullscreen"
        allowFullScreen
      ></iframe>

      <h1 className="text-2xl font-bold mb-6">Mars Visit Application Form</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 border rounded-lg shadow-lg bg-white space-y-4 text-black"
      >
        {stage == 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              onBlur={() => validateField("fullName", formData.fullName)}
              placeholder="Full Name"
              className="w-full p-2 border rounded mb-2"
              required
            />
            {validationErrors.fullName && (
              <p className="text-red-500 text-sm">
                {validationErrors.fullName}
              </p>
            )}

            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              onBlur={() => validateField("dateOfBirth", formData.dateOfBirth)}
              className="w-full p-2 border rounded mb-2"
              required
            />

            <CountryDropdown
              name="country"
              value={country}
              onChange={onChangeCountry}
              onBlur={() => validateField("country", country)}
              className="w-full p-2 border rounded mb-2"
            />
            {validationErrors.country && (
              <p className="text-red-500 text-sm">{validationErrors.country}</p>
            )}

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={() => validateField("email", formData.email)}
              placeholder="Email"
              className="w-full p-2 border rounded mb-2"
              required
            />
            {validationErrors.email && (
              <p className="text-red-500 text-sm">{validationErrors.email}</p>
            )}

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              onBlur={() => validateField("phone", formData.phone)}
              placeholder="Phone"
              className="w-full p-2 border rounded"
              required
            />
            {validationErrors.phone && (
              <p className="text-red-500 text-sm">{validationErrors.phone}</p>
            )}
          </div>
        )}
        {stage == 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Travel Preferences</h2>
            <input
              type="date"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleInputChange}
              placeholder="Departure Date"
              className="w-full p-2 border rounded mb-2"
              required
            />
            <input
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleInputChange}
              placeholder="Return Date"
              className="w-full p-2 border rounded mb-2"
              required
            />
            <select
              name="accommodation"
              value={formData.accommodation}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="Space Hotel">Space Hotel</option>
              <option value="Martian Base">Martian Base</option>
            </select>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleInputChange}
              placeholder="Special Requests or Preferences"
              className="w-full p-2 border rounded"
            />
          </div>
        )}
        {stage == 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Health and Safety</h2>
            <label className="block mb-2">
              <input
                type="checkbox"
                name="healthDeclaration"
                checked={formData.healthDeclaration}
                onChange={handleInputChange}
                className="mr-2"
                required
              />
              I declare that I am in good health
            </label>
            <input
              type="text"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleInputChange}
              placeholder="Emergency Contact"
              className="w-full p-2 border rounded mb-2"
              required
            />
            <textarea
              name="medicalConditions"
              value={formData.medicalConditions}
              onChange={handleInputChange}
              placeholder="Any Medical Conditions (if applicable)"
              className="w-full p-2 border rounded"
            />
          </div>
        )}
        {stage == 4 && (
          <div>
            <h2 className="text-xl font-semibold text-center mb-4">
              Application Submitted Successfully!
            </h2>
            <p className="text-center">
              Thank you for your application. We will process it and get back to
              you soon.
            </p>
          </div>
        )}

        <div className="flex justify-between">
          {stage > 1 && (
            <button
              type="button"
              onClick={() => setStage(stage - 1)}
              className="px-4 py-2 bg-gray-300 text-black rounded"
            >
              Back
            </button>
          )}
          {stage < 3 && (
            <button
              type="button"
              onClick={() => setStage(stage + 1)}
              className={`px-4 py-2 rounded ${
                validateStage()
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!validateStage()}
            >
              Next
            </button>
          )}

          {stage === 3 && (
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
