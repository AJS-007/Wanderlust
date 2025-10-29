const Listing = require("../models/listing");

const axios = require("axios");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new");
};

module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate({
        path: "reviews",
        populate: {
            path: "author",
        },
    }).populate("owner");

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    res.render("listings/show", { listing });
};

// module.exports.createListing = async (req, res) => {
//     try {
//         // const geoResponse = await axios.get("https://nominatim.openstreetmap.org/search", {
//         //     params: {
//         //         q: req.body.listing.location,
//         //         format: "json",
//         //         limit: 1,
//         //     },
//         //     headers: {
//         //         'User-Agent': 'WanderlustApp/1.0 (https://github.com/AJS-007)',
//         //     },
//         // });

//         // const coords = geoResponse.data[0]
//         //     ? [parseFloat(geoResponse.data[0].lon), parseFloat(geoResponse.data[0].lat)]
//         //     : [0, 0]; // fallback if location not found

//         const newListing = new Listing(req.body.listing);
//         newListing.owner = req.user._id;
//         // newListing.geometry = {
//         //     type: "Point",
//         //     coordinates: coords,
//         // };

//         await newListing.save();
//         req.flash("success", "New listing created!");
//         res.redirect(`/listings/${newListing._id}`);
//     } catch (err) {
//         console.error("Error creating listing:", err.message);
//         req.flash("error", "Failed to create listing.");
//         res.redirect("/listings/new");
//     }
// };



module.exports.createListing = async (req, res, next) => {
    // 🧭 DEBUG START — this helps see exactly what’s coming from the client
    console.log("🔹 req.body:", req.body);
    console.log("🔹 req.file:", req.file);
    console.log("🔹 req.files:", req.files);
    console.log("🔹 req.headers['content-type']:", req.headers['content-type']);
    // 🧭 DEBUG END

    try {
        if (!req.file) {
            console.log("⚠️ No file uploaded — check Multer setup or form field name!");
        }

        let url = req.file?.path;
        let filename = req.file?.filename;

        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;

        if (req.file) {
            newListing.image = { url, filename };
        }

        await newListing.save();
        console.log("✅ New listing saved:", newListing);

        req.flash("success", "New Listing Created");
        res.redirect("/listings");
    } catch (err) {
        console.error("❌ Error creating listing:", err.message);
        next(err); // passes it to Express error handler
    }
};




module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

       const originalImageUrl = listing.image.url;

    res.render("listings/edit", { listing, originalImageUrl });

};

module.exports.updateListing = async (req, res) => {
    const { id } = req.params;

    try {
        const listing = await Listing.findByIdAndUpdate(id, req.body.listing);

        const geoResponse = await axios.get("https://nominatim.openstreetmap.org/search", {
            params: {
                q: req.body.listing.location,
                format: "json",
                limit: 1,
            },
            headers: {
                'User-Agent': 'WanderlustApp/1.0 (https://github.com/AJS-007)',
            },
        });

        const coords = geoResponse.data[0]
            ? [parseFloat(geoResponse.data[0].lon), parseFloat(geoResponse.data[0].lat)]
            : listing.geometry.coordinates; // fallback to old coords

        listing.geometry = {
            type: "Point",
            coordinates: coords,
        };

        await listing.save();
        req.flash("success", "Listing updated successfully!");
        res.redirect(`/listings/${listing._id}`);
    } catch (err) {
        console.error("Error updating listing:", err.message);
        req.flash("error", "Failed to update listing.");
        res.redirect(`/listings/${id}/edit`);
    }
};

module.exports.destroyListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted!");
    res.redirect("/listings");
};
