"use client";
import { useGetAllDeliveryDistrictsQuery } from "@/redux/features/district";
import ErrorMsg from "../common/error-msg";

const CheckoutBillingArea = ({
  register,
  errors,
  setShippingCost,
  shippingCost,
}) => {
  const {
    data: deliveryDistricts,
    isError,
    isLoading,
  } = useGetAllDeliveryDistrictsQuery();

  let content = null;

  if (isLoading) {
    content = <h2>Loading....</h2>;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError) {
    content = (
      <div className="tp-checkout-bill-area">
        <h3 className="tp-checkout-bill-title">Billing Details</h3>

        <div className="tp-checkout-bill-form">
          <div className="tp-checkout-bill-inner">
            <div className="row">
              <div className="col-md-6">
                <div className="tp-checkout-input">
                  <label>
                    Full Name <span>*</span>
                  </label>
                  <input
                    {...register("fullName", {
                      required: `fullName is required!`,
                    })}
                    name="fullName"
                    id="fullName"
                    type="text"
                    placeholder="Full Name"
                    className="tp-checkout-input-field"
                  />
                  <ErrorMsg msg={errors?.fullName?.message} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="tp-checkout-input">
                  <label>
                    Phone Number <span>*</span>
                  </label>
                  <input
                    {...register("phoneNumber", {
                      required: `phoneNumber is required!`,
                    })}
                    name="phoneNumber"
                    id="phoneNumber"
                    type="text"
                    placeholder="Phone Number"
                    className="tp-checkout-input-field"
                  />
                  <ErrorMsg msg={errors?.phoneNumber?.message} />
                </div>
              </div>
              <div className="col-md-12">
                <div className="tp-checkout-input">
                  <label>Email Address</label>
                  <input
                    {...register("emailAddress", {})}
                    name="emailAddress"
                    id="emailAddress"
                    type="email"
                    placeholder="Email Address"
                    className="tp-checkout-input-field"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div
                  style={{ display: "flex", flexDirection: "column" }}
                  className="tp-checkout-input"
                >
                  <label>
                    District <span>*</span>
                  </label>
                  <select
                    {...register("district", {
                      required: "District is required",
                    })}
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      setShippingCost(0);
                      const selectedDistrict = deliveryDistricts.result.find(
                        (d) => d._id === selectedId
                      );

                      if (selectedDistrict) {
                        setShippingCost(selectedDistrict.deliveryCost);
                      }
                    }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "50px",
                      justifyContent: "center",
                      padding: "15px 5px",
                    }}
                  >
                    <option value="">Select a district</option>
                    {deliveryDistricts?.result
                      ?.slice()
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((district, index) => (
                        <option key={index} value={district._id}>
                          {district.name}
                        </option>
                      ))}
                  </select>

                  <ErrorMsg msg={errors?.district?.message} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="tp-checkout-input">
                  <label>Town / City</label>{" "}
                  <span style={{ color: "red" }}>*</span>
                  <input
                    {...register("city", { required: `City is required!` })}
                    name="city"
                    id="city"
                    type="text"
                    placeholder="City"
                    className="tp-checkout-input-field"
                  />
                  <ErrorMsg msg={errors?.city?.message} />
                </div>
              </div>
              <div className="col-md-12">
                <div className="tp-checkout-input">
                  <label>Street</label> <span style={{ color: "red" }}>*</span>
                  <input
                    {...register("street", {
                      required: `Address is required!`,
                    })}
                    name="street"
                    id="street"
                    type="text"
                    placeholder="Street name"
                    className="tp-checkout-input-field"
                  />
                  <ErrorMsg msg={errors?.street?.message} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="tp-checkout-input">
                  <label>Building</label>{" "}
                  <span style={{ color: "red" }}>*</span>
                  <input
                    {...register("building", {
                      required: `Building is required!`,
                    })}
                    name="building"
                    id="building"
                    type="text"
                    placeholder="Building"
                    className="tp-checkout-input-field"
                  />
                  <ErrorMsg msg={errors?.building?.message} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="tp-checkout-input">
                  <label>Floor</label> <span style={{ color: "red" }}>*</span>
                  <input
                    {...register("floor", {
                      required: `Floor is required!`,
                    })}
                    name="floor"
                    id="floor"
                    type="text"
                    placeholder="Building"
                    className="tp-checkout-input-field"
                  />
                  <ErrorMsg msg={errors?.floor?.message} />
                </div>
              </div>

              <div className="col-md-12">
                <div className="tp-checkout-input">
                  <label>Order notes</label>
                  <textarea
                    {...register("orderNote", { required: false })}
                    name="orderNote"
                    id="orderNote"
                    placeholder="Notes about your order, e.g. special notes for delivery."
                    className="tp-checkout-input-field"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{content}</>;
};

export default CheckoutBillingArea;
