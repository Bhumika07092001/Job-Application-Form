import React, { useState } from "react";
import FormField from "./FormField";

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    position: "",
    relevantExperience: "",
    portfolioUrl: "",
    managementExperience: "",
    additionalSkills: [],
    preferredInterviewTime: "",
  });
  const [showResponse, setShowResponse] = useState(false);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => {
        if (checked) {
          return {
            ...prevData,
            additionalSkills: [...prevData.additionalSkills, value],
          };
        } else {
          return {
            ...prevData,
            additionalSkills: prevData.additionalSkills.filter(
              (skill) => skill !== value
            ),
          };
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone Number is required";
    if (!formData.position) newErrors.position = "Position is required";
    if (
      (formData.position === "Developer" || formData.position === "Designer") &&
      (!formData.relevantExperience || formData.relevantExperience <= 0)
    ) {
      newErrors.relevantExperience =
        "Relevant Experience is required and must be greater than 0";
    }
    if (formData.position === "Designer" && !formData.portfolioUrl) {
      newErrors.portfolioUrl = "Portfolio URL is required";
    }
    if (formData.position === "Manager" && !formData.managementExperience) {
      newErrors.managementExperience = "Management Experience is required";
    }
    if (formData.additionalSkills.length === 0) {
      newErrors.additionalSkills =
        "At least one additional skill must be selected";
    }
    if (!formData.preferredInterviewTime) {
      newErrors.preferredInterviewTime = "Preferred Interview Time is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowResponse(true);
      console.log("Form Submitted", formData);
    }
  };

  return (
    <>
      {showResponse ? (
        <div className="submitted-data">
          <h1>Thanks for applying!</h1>
          <h2>submitted Data</h2>
          <p>
            Full Name: <strong>{formData.fullName}</strong>
          </p>
          <p>
            Email: <strong>{formData.email}</strong>
          </p>
          <p>
            Phone Number: <strong>{formData.phoneNumber}</strong>
          </p>
          <p>
            Position: <strong>{formData.position}</strong>
          </p>
          <p>
            Relevant Experience: <strong>{formData.relevantExperience}</strong>
          </p>
              {
            formData.position === "Designer" && (
              <p>
                Portfolio URL: <strong>{formData.portfolioUrl}</strong>
              </p>
            )
          }
          <p>
            Management Experience:{" "}
            <strong>{formData.managementExperience}</strong>
          </p>
          <p>
            Additional Skills:{" "}
            <strong>{formData.additionalSkills.join(", ")}</strong>
          </p>
          <p>
            Preferred Interview Time:{" "}
            <strong>{formData.preferredInterviewTime}</strong>
          </p>
        </div>
      ) : (
        <div className="job-application-form">
          <h1>Job Application Form</h1>
          <form onSubmit={handleSubmit}>
            <FormField
              label="Full Name"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
            />
            <FormField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            <FormField
              label="Phone Number"
              type="number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              error={errors.phoneNumber}
            />
            <FormField
              label="Applying for Position"
              type="select"
              name="position"
              value={formData.position}
              onChange={handleChange}
              options={["", "Developer", "Designer", "Manager"]}
              error={errors.position}
            />
            {["Developer", "Designer"].includes(formData.position) && (
              <FormField
                label="Relevant Experience (years)"
                type="number"
                name="relevantExperience"
                value={formData.relevantExperience}
                onChange={handleChange}
                error={errors.relevantExperience}
              />
            )}
            {formData.position === "Designer" && (
              <FormField
                label="Portfolio URL"
                type="url"
                name="portfolioUrl"
                value={formData.portfolioUrl}
                onChange={handleChange}
                error={errors.portfolioUrl}
              />
            )}
            {formData.position === "Manager" && (
              <FormField
                label="Management Experience"
                type="textarea"
                name="managementExperience"
                value={formData.managementExperience}
                onChange={handleChange}
                error={errors.managementExperience}
              />
            )}
            <div className="form-group">
              <label>Additional Skills:</label>
              <br />
              <label>
                <input
                  type="checkbox"
                  name="additionalSkills"
                  value="JavaScript"
                  checked={formData.additionalSkills.includes("JavaScript")}
                  onChange={handleChange}
                />
                JavaScript
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  name="additionalSkills"
                  value="CSS"
                  checked={formData.additionalSkills.includes("CSS")}
                  onChange={handleChange}
                />
                CSS
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  name="additionalSkills"
                  value="Python"
                  checked={formData.additionalSkills.includes("Python")}
                  onChange={handleChange}
                />
                Python
              </label>
              <br />
              {errors.additionalSkills && (
                <p className="error">{errors.additionalSkills}</p>
              )}
            </div>
            <FormField
              label="Preferred Interview Time"
              type="datetime-local"
              name="preferredInterviewTime"
              value={formData.preferredInterviewTime}
              onChange={handleChange}
              error={errors.preferredInterviewTime}
            />
            <button className="submit-btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default JobApplicationForm;
