import { AiOutlineInfoCircle, AiOutlinePlus } from "react-icons/ai";
import { TbTrash, TbEdit } from "react-icons/tb";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Select,
  MenuItem,
  TablePagination,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../components/modal/ConfirmationModal";
import {
  addCompany,
  deleteCompany,
  getAllCompanies,
  editCompany,
} from "../services/operations/companyApi";
import { Link, useParams } from "react-router-dom";

const CompanyDetail = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editMode, setEditMode] = useState(false);
  const [currentCompanyId, setCurrentCompanyId] = useState(null);

  const { token } = useSelector((state) => state.auth);
  const { companies } = useSelector((state) => state.company);
  const dispatch = useDispatch();
  const { companyId } = useParams();

  const [open, setOpen] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setFormData({
      companyName: "",
      companyDescription: "",
      companyWebsiteURL: "",
      arrival_date: "",
      packageAmount: "",
      year: "",
      companyType: "",
    });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "1px solid black",
    boxShadow: 24,
    p: 2,
    fontSize: "0.9rem",
  };

  useEffect(() => {
    if (token) {
      dispatch(getAllCompanies(token));
    }
  }, [dispatch, token]);

  const [formData, setFormData] = useState({
    companyName: "",
    companyDescription: "",
    companyWebsite: "",
    arrival_date: "",
    packageAmount: "",
    year: "",
    companyType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddCompany = () => {
    try {
      if (editMode) {
        dispatch(editCompany(token, currentCompanyId, formData));
      } else {
        dispatch(addCompany(token, formData));
      }
    } catch (err) {
      console.log("ERROR MESSAGE - ", err.message);
    }
    handleClose();
  };

  const handleEditButtonClick = (company) => {
    setEditMode(true);
    setCurrentCompanyId(company._id);
    setFormData({
      companyName: company.companyName,
      companyDescription: company.companyDescription,
      companyWebsite: company.companyWebsite,
      arrival_date: company.arrival_date,
      packageAmount: company.packageAmount,
      year: company.year,
      companyType: company.companyType,
    });
    handleOpen();
  };

  const handleDelete = (id) => {
    try {
      dispatch(deleteCompany(token, id));
    } catch (err) {
      console.log("ERROR MESSAGE - ", err.message);
    }
    setConfirmationModal(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayCompanies = Array.isArray(companies)
    ? companies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : [];

  return (
    <div className="bg-gray-100 text-gray-900 p-8">
      <div className="mb-4">
        <h1 className="text-4xl font-bold uppercase tracking-widest text-gray-700 mb-2">
          Company's List
        </h1>
        <nav aria-label="breadcrumb">
          <ol className="list-none p-0 inline-flex text-sm">
            <li className="flex items-center">
              <a
                href="/dashboard/home"
                className="text-gray-700 hover:text-gray-500"
              >
                Dashboard
              </a>
              <span className="mx-2 text-gray-700">/</span>
            </li>
            <li className="flex items-center">
              <a
                href="/dashboard/company"
                className="text-gray-700 hover:text-gray-500"
              >
                Companies
              </a>
            </li>
          </ol>
        </nav>
      </div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-700">
          No. of Companies ({Array.isArray(companies) ? companies.length : 0})
        </h2>
        <button
          onClick={handleOpen}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded inline-flex items-center"
        >
          <AiOutlinePlus className="mr-2" />
          Add New Company
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayCompanies.map((item, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-between items-center mb-2">
              <Typography variant="h6" className="font-semibold">
                {item.companyName}
              </Typography>
              <div className="flex gap-2">
                <button onClick={() => handleEditButtonClick(item)}>
                  <TbEdit fontSize={25} className="text-gray-700 hover:text-gray-500" />
                </button>
                <button
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Are you sure?",
                      text2: "You want to delete this company",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDelete(item._id),
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }
                >
                  <TbTrash fontSize={25} className="text-gray-700 hover:text-gray-500" />
                </button>
              </div>
            </div>
            <Typography variant="body2" className="mb-2">
              Type: {item.companyType}
            </Typography>
            <Typography variant="body2" className="mb-2">
              Arrival Date: {item.arrival_date}
            </Typography>
            <Typography variant="body2" className="mb-2">
              CTC: {item.packageAmount}
            </Typography>
            <Typography variant="body2" className="mb-2">
              Year: {item.year}
            </Typography>
            <div className="flex justify-end mt-4">
              <Link to={`/dashboard/companyinfo/${item._id}`}>
                <button className="text-blue-600 hover:text-blue-800">
                  <AiOutlineInfoCircle fontSize={25} />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal} />
      )}
      <TablePagination
        component="div"
        count={Array.isArray(companies) ? companies.length : 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[6, 12, 24]}
        className="mt-4"
      />
      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-4">
            <h2
              id="modal-modal-title"
              className="text-2xl font-semibold mb-4 text-center"
            >
              {editMode ? "Edit Company" : "Add Company"}
            </h2>
            <div className="space-y-2">
              <TextField
                label="Company Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Company Description"
                name="companyDescription"
                value={formData.companyDescription}
                onChange={handleChange}
                fullWidth
                multiline
                rows={1}
                variant="outlined"
              />
              <TextField
                label="Company Website"
                name="companyWebsite"
                value={formData.companyWebsite}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Arrival Date"
                name="arrival_date"
                value={formData.arrival_date}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="CTC (Package Amount)"
                name="packageAmount"
                value={formData.packageAmount}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
              <Select
                label="Company Type"
                name="companyType"
                value={formData.companyType}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              >
                <MenuItem value="Technical">Technical</MenuItem>
                <MenuItem value="Non-Technical">Non-Technical</MenuItem>
              </Select>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <Button onClick={handleClose} variant="outlined" color="secondary">
                Cancel
              </Button>
              <Button onClick={handleAddCompany} variant="contained" color="primary">
                {editMode ? "Save Changes" : "Add Company"}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CompanyDetail;
