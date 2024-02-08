import React, { useState } from 'react';

const PropertyForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        bedrooms: 0,
        bathrooms: 0,
        size: 0,
        address: {
            street: '',
            city: '',
            state: '',
            zipcode: '',
        },
        amenities: {
            swimmingPool: false,
            garden: false,
            garage: false,
            gym: false,
            securitySystem: false,
            balcony: false,
            centralHeating: false,
            airConditioning: false,
        },
        additionalFeatures: [],
        rating: [{ value: 1, review: '', createdBy: '', createdAt: '' }],
        propertyHistory: {
            previousOwners: [{ name: '', contact: '' }],
            saleHistory: [{ soldPrice: 0, soldDate: '', buyer: '' }],
            rentalHistory: [{ rentPrice: 0, rentStartDate: '', rentEndDate: '', tenant: '' }],
        },
        images: [],
        propertyType: 'House',
        agent: '',
        tags: [],
        status: 'For Sale',
        virtualTour: { url: '' },
        nearbyAmenities: [],
        availability: true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData((prevData) => ({
                ...prevData,
                [parent]: {
                    ...prevData[parent],
                    [child]: type === 'checkbox' ? checked : value,
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>
            <br />
            <label>
                Description:
                <textarea name="description" value={formData.description} onChange={handleChange} />
            </label>
            <br />
            <label>
                Price:
                <input type="number" name="price" value={formData.price} onChange={handleChange} />
            </label>
            <br />
            <label>
                Bedrooms:
                <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} />
            </label>
            <br />
            <label>
                Bathrooms:
                <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} />
            </label>
            <br />
            <label>
                Size:
                <input type="number" name="size" value={formData.size} onChange={handleChange} />
            </label>
            <br />
            <fieldset>
                <legend>Address:</legend>
                <label>
                    Street:
                    <input type="text" name="address.street" value={formData.address.street} onChange={handleChange} />
                </label>
                <br />
                <label>
                    City:
                    <input type="text" name="address.city" value={formData.address.city} onChange={handleChange} />
                </label>
                <br />
                <label>
                    State:
                    <input type="text" name="address.state" value={formData.address.state} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Zipcode:
                    <input type="text" name="address.zipcode" value={formData.address.zipcode} onChange={handleChange} />
                </label>
            </fieldset>
            <br />
            <fieldset>
                <legend>Amenities:</legend>
                <label>
                    Swimming Pool:
                    <input type="checkbox" name="amenities.swimmingPool" checked={formData.amenities.swimmingPool} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Garden:
                    <input type="checkbox" name="amenities.garden" checked={formData.amenities.garden} onChange={handleChange} />
                </label>
                <br />
                {/* Add more checkboxes for other amenities */}
            </fieldset>
            <br />
            <fieldset>
                <legend>Rating:</legend>
                <label>
                    Value:
                    <input type="number" name="rating[0].value" value={formData.rating[0].value} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Review:
                    <textarea name="rating[0].review" value={formData.rating[0].review} onChange={handleChange} />
                </label>
            </fieldset>
            <br />
            <fieldset>
                <legend>Property History:</legend>
                <label>
                    Previous Owner Name:
                    <input type="text" name="propertyHistory.previousOwners[0].name" value={formData.propertyHistory.previousOwners[0].name} onChange={handleChange} />
                </label>
                <br />
                {/* Add more input fields for other property history */}
            </fieldset>
            <br />
            {/* Add more input fields for other properties */}
            <button type="submit">Submit</button>
        </form>
    );
};

export default PropertyForm;
