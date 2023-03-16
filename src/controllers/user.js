const { Calculator } = require('../utils/calculator');


// @route GET api/user
// @desc Returns user details
// @access Public
exports.index = function (req, res) {
    res.status(200).json({user: req.user});
};

exports.calculator = function (req, res) {
    const { goals, assets, liabilities, monthlyRevenue, monthlyExpense } = req.body;

    if (!goals) {
        return res.status(422).json({
            status : false,
            message :'Goals is required.'
        });
    }

    if (!assets) {
        return res.status(422).json({
            status : false,
            message :'Assets is required.'
        });
    }

    if (!liabilities) {
        return res.status(422).json({
            status : false,
            message :'Liabilities is required.'
        });
    }

    if (!monthlyRevenue) {
        return res.status(422).json({
            status : false,
            message :'Monthly Revenue is required.'
        });
    }

    if (!monthlyExpense) {
        return res.status(422).json({
            status : false,
            message :'Monthly Expense is required.'
        });
    }

    var calc = new Calculator(goals, assets, liabilities, monthlyRevenue, monthlyExpense);

    return res.status(200).json({
        status: true,
        data: calc.getComputation()
    });
};
