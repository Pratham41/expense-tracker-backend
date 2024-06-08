const router = require('express').Router();
const { addTransaction, getAllTransactions, editTransaction, deleteTransaction } = require('../controller/transaction')

router.route('/add-transaction').post(addTransaction);
router.route('/edit-transaction').post(editTransaction);
router.route('/delete-transaction').post(deleteTransaction);
router.route('/get-all-transactions').post(getAllTransactions);




module.exports = router;



