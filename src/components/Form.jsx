import React, { useState ,useEffect } from 'react';

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    phone: "",
    state : "",
    country : "",
    PinCode : "",
    Password : "",
    confirmPassword : ""
  });
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Required field";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid email required";
    }
    if (!formData.gender) newErrors.gender = "Please select gender";
    if (!formData.phone || isNaN(formData.phone) || formData.phone.length !== 10) {
      newErrors.phone = "Must be 10 digits";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.Password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      alert("Password doesn't match")
    }
    return newErrors;

  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      fetch('https://registration-form-ojrk.vercel.app/api/save', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            console.log(formData);
            alert("Registered Successfully");
          }
        })
        .catch((error) => {
          console.error("Error saving data:", error);
          setErrors({ api: "Failed to submit data, please try again later." });
        });
    }
  };

  return (
    <>
      <div className="absolute w-full h-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1] brightness-50"
      >
        <source src="\public\24369-342401468_medium.mp4" type="video/mp4" />
      </video>
    </div>

    <div className="flex items-center justify-center min-h-screen mr-40">
      <div className="  flex bg-[#9397a900] w-full max-w-5xl rounded-lg shadow-lg overflow-hidden">

        <div className="hidden sm:block w-2/3 h-60 top-48 bg-cover bg-center relative align-middle" style={{ backgroundImage: `url('register_image-removebg-preview.png')` }}>


        </div>


        <section className="w-1/2 bg-[#c7c8cd00] p-8 relative z-10">
          <header className="mb-6 text-center">
            <h3 className="text-4xl font-bold text-white mb-2">Register</h3>
            <h4 className="text-xl text-white opacity-75 tracking-wide">Please fill your information below</h4>
          </header>

          <main>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-b-2 border-[#75759E] text-[#E2E3E8] bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && <small className="text-red-500 text-sm mt-1 block">{errors.name}</small>}
              </div>

              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-b-2 border-[#75759E] text-[#E2E3E8] bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && <small className="text-red-500 text-sm mt-1 block">{errors.email}</small>}
              </div>

              <div className="mb-4">
                <label className="text-[#E2E3E8] text-sm mb-5 mx-4">Gender</label>
                <div className="flex space-x-10 justify-around mx-auto">
                  <div className="flex items-center">
                    <input
                      id="Male"
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={formData.gender === "Male"}
                      onChange={handleChange}
                      className="mr-2 focus:ring-2 focus:ring-blue-500"
                    />
                    <label htmlFor="Male" className="text-[#E2E3E8]">Male</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="Female"
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={formData.gender === "Female"}
                      onChange={handleChange}
                      className="mr-2 focus:ring-2 focus:ring-blue-500"
                    />
                    <label htmlFor="Female" className="text-[#E2E3E8]">Female</label>
                  </div>
                </div>
                {errors.gender && <small className="text-red-500 text-sm mt-1 block">{errors.gender}</small>}
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-b-2 border-[#75759E] text-[#E2E3E8] bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.phone && <small className="text-red-500 text-sm mt-1 block">{errors.phone}</small>}
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-b-2 border-[#75759E] text-[#E2E3E8] bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              <div className="mb-4">
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-b-2 border-[#75759E] text-[#E2E3E8] bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              <div className="mb-4">
                <input
                  type="text"
                  name="PinCode"
                  placeholder="Pin Code"
                  value={formData.PinCode}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-b-2 border-[#75759E] text-[#E2E3E8] bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              <div className="mb-4">
                <input
                  type="text"
                  name="Password"
                  placeholder="Password"
                  value={formData.Password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-b-2 border-[#75759E] text-[#E2E3E8] bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              <div className="mb-4">
                <input
                  type="text"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-b-2 border-[#75759E] text-[#E2E3E8] bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-[#75759E] text-white rounded-full font-bold text-xl transition-all duration-200 hover:bg-[#EDA261] border-2 border-[#75759E] hover:border-[#EDA261] focus:ring-2 focus:ring-[#EDA261]"
                >
                  Submit
                </button>
              </div>


            </form>
          </main>


        </section>
      </div>
    </div>
  </>
);
}

export default Form;