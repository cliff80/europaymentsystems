// JavaScript Document

// Environment variables
var g_nACWeeksPerYear = 2;
var g_nACHoursPerWeek = 30;
var g_nACPowerUsage = 200;
var g_nPrimaryPOHPerWeek = 168;
var g_nAdditionalAutoOnHoursPerWeek = 15.5;
var g_nKFactorofAC = 2.0;
var g_nTimeBetweenAutoRepower = 2;
var g_nDurationOfAutoRepower = 0.4;

// Vending Miser Before
var g_nACPOHPerYear_VM_Before = 0;
var g_nACEnergyPerYear_VM_Before = 0;
var g_nPrimaryPOHPerYear_VM_Before = 0;
var g_nPrimaryEnergyPerYear_VM_Before = 0;
var g_nPresentTotalEnergyUsage_VM_Before = 0;
var g_nPresentTotalEnergyCost_VM_Before = 0;

// Vending Miser After
var g_nACPOHPerYear_VM_After = 0;
var g_nACEnergyPerYear_VM_After = 0;
var g_nPrimaryPOHPerYear_VM_After = 0;
var g_nPrimaryEnergyPerYear_VM_After = 0;
var g_nPresentTotalEnergyUsage_VM_After = 0;
var g_nPresentTotalEnergyCost_VM_After = 0;

// Snack Miser Before
var g_nPrimaryPOHPerYear_SM_Before = 0;
var g_nPrimaryEnergyPerYear_SM_Before = 0;
var g_nPresentTotalEnergyUsage_SM_Before = 0;
var g_nPresentTotalEnergyCost_SM_Before = 0;

// Snack Miser After
var g_nPrimaryPOHPerYear_SM_After = 0;
var g_nPrimaryEnergyPerYear_SM_After = 0;
var g_nPresentTotalEnergyUsage_SM_After = 0;
var g_nPresentTotalEnergyCost_SM_After = 0;

function  StartAnalysis()
{
	UpdateVendingMiser();
	UpdateSnackMiser();
	UpdateProjectSummary();
}

function  StartAnalysisb()
{
	//window.setTimeout("alert('Calculation Completed')", 500);
	UpdateVendingMiser();
	UpdateSnackMiser();
	UpdateProjectSummary();
}

function checkKey()
{
	if (window.event.keyCode == 13) StartAnalysisb();
}

function UpdateVendingMiser()
{
	var frm = document.frmMain;

	//*******************************************
	//* BEFORE Vending Miser Installation
	//*******************************************
	
	g_nACPowerUsage = parseInt(frm.txtPowerCold.value) / g_nKFactorofAC;
	if (parseInt(frm.txtOccupiedHours.value) != 168)
		g_nAdditionalAutoOnHoursPerWeek = ((168 - parseInt(frm.txtOccupiedHours.value))/(g_nTimeBetweenAutoRepower + g_nDurationOfAutoRepower))*g_nDurationOfAutoRepower;

	//
	// A/C POH/Yr Before
	//
	if (g_nPrimaryPOHPerWeek < g_nACHoursPerWeek)
		g_nACPOHPerYear_VM_Before = g_nACWeeksPerYear * g_nPrimaryPOHPerWeek;
	else
		g_nACPOHPerYear_VM_Before = g_nACWeeksPerYear * g_nACHoursPerWeek;

	//
	// A/C Energy/Yr Before
	//
	g_nACEnergyPerYear_VM_Before = g_nACPowerUsage * g_nACPOHPerYear_VM_Before / 1000;

	//
	// Primary POH/Yr Before
	//
	g_nPrimaryPOHPerYear_VM_Before = 168 * 52;

	//
	// Primary Energy/Yr Before
	//
	g_nPrimaryEnergyPerYear_VM_Before = parseInt(frm.txtPowerCold.value) * g_nPrimaryPOHPerYear_VM_Before / 1000 ;

	//
	// Present Total Energy Usage Before
	//
	g_nPresentTotalEnergyUsage_VM_Before = (g_nPrimaryEnergyPerYear_VM_Before) * parseInt(frm.txtNumColdMachines.value);
	document.getElementById('kWhBeforeCold').innerHTML = FormatNumber(Math.round(g_nPresentTotalEnergyUsage_VM_Before));

	//
	// Present Total Energy Cost Before
	//
	g_nPresentTotalEnergyCost_VM_Before = g_nPresentTotalEnergyUsage_VM_Before * parseFloat(CleanString(frm.txtEnergyCosts.value));
	document.getElementById('CostBeforeCold').innerHTML = FormatCurrency(FormatNumber(g_nPresentTotalEnergyCost_VM_Before));


	//*****************************************
	//* AFTER Vending Miser Installation
	//*****************************************

	//
	// A/C POH/Yr After
	//
	if (g_nPrimaryPOHPerWeek > parseInt(frm.txtOccupiedHours.value))
	{
		if (parseInt(frm.txtOccupiedHours.value) < g_nACHoursPerWeek)
			g_nACPOHPerYear_VM_After = parseInt(frm.txtOccupiedHours.value) * g_nACWeeksPerYear;
		else		
			g_nACPOHPerYear_VM_After = g_nACWeeksPerYear * g_nACHoursPerWeek;
	}
	else
	{
		if (g_nPrimaryPOHPerWeek < g_nACHoursPerWeek)
			g_nACPOHPerYear_VM_After = g_nPrimaryPOHPerWeek * g_nACWeeksPerYear;
		else		
			g_nACPOHPerYear_VM_After = g_nACWeeksPerYear * g_nACHoursPerWeek;
	}

	//
	// A/C Energy/Yr After
	//
	g_nACEnergyPerYear_VM_After = g_nACPowerUsage * g_nACPOHPerYear_VM_After / 1000;


	//
	// Primary POH/Yr After
	//
	if (g_nPrimaryPOHPerWeek > parseInt(frm.txtOccupiedHours.value))

		g_nPrimaryPOHPerYear_VM_After = (parseInt(frm.txtOccupiedHours.value) + g_nAdditionalAutoOnHoursPerWeek) * 52;
	else
		g_nPrimaryPOHPerYear_VM_After = g_nPrimaryPOHPerWeek * 52;


	//
	// Primary Energy/Yr After
	//
	g_nPrimaryEnergyPerYear_VM_After = parseInt(frm.txtPowerCold.value) * g_nPrimaryPOHPerYear_VM_After / 1000 ;

	//
	// Present Total Energy Usage After
	//
	g_nPresentTotalEnergyUsage_VM_After = (g_nPrimaryEnergyPerYear_VM_After) * parseInt(frm.txtNumColdMachines.value);
	document.getElementById('kWhAfterCold').innerHTML = FormatNumber(Math.round(g_nPresentTotalEnergyUsage_VM_After));

	//
	// Present Total Energy Cost After
	//
	g_nPresentTotalEnergyCost_VM_After = g_nPresentTotalEnergyUsage_VM_After * parseFloat(CleanString(frm.txtEnergyCosts.value));
	document.getElementById('CostAfterCold').innerHTML = FormatCurrency(FormatNumber(g_nPresentTotalEnergyCost_VM_After));

	//
	// Total kWh savings  ***
	//
	document.getElementById('kWhSavingsCold').innerHTML = FormatNumber(Math.round(g_nPresentTotalEnergyUsage_VM_Before - g_nPresentTotalEnergyUsage_VM_After));

	//
	// % kWh Savings
	//
	var nSavings = 1 - (g_nPresentTotalEnergyUsage_VM_After/g_nPresentTotalEnergyUsage_VM_Before);
	if(nSavings)
	{
		document.getElementById('EnergySavingsCold').innerHTML = Math.round(nSavings * 100) + "%";
	}
	else
	{
		document.getElementById('EnergySavingsCold').innerHTML = 0;
	}



	//
	// Total Cost savings  ***
	//
	document.getElementById('CostSavingsCold').innerHTML = FormatCurrency(FormatNumber(g_nPresentTotalEnergyCost_VM_Before - g_nPresentTotalEnergyCost_VM_After));

	//
	// % Cost Savings
	//
	var nSavings = 1 - (g_nPresentTotalEnergyCost_VM_After/g_nPresentTotalEnergyCost_VM_Before);
	if(nSavings)
	{
		document.getElementById('pCostSavingsCold').innerHTML = Math.round(nSavings * 100) + "%";
	}
	else
	{
		document.getElementById('pCostSavingsCold').innerHTML = 0;
	}

	
}

function UpdateSnackMiser()
{
	var frm = document.frmMain;

	//*******************************************
	//* BEFORE Snack Miser Installation
	//*******************************************

	//
	// Primary POH/Yr Before
	//
	g_nPrimaryPOHPerYear_SM_Before = 168 * 52;

	//
	// Primary Energy/Yr Before
	//
	g_nPrimaryEnergyPerYear_SM_Before = parseInt(frm.txtPowerSnack.value) * g_nPrimaryPOHPerYear_SM_Before / 1000 ;

	//
	// Present Total Energy Usage Before
	//
	g_nPresentTotalEnergyUsage_SM_Before = g_nPrimaryEnergyPerYear_SM_Before * parseInt(frm.txtNumSnackMachines.value);
	document.getElementById('kWhBeforeSnack').innerHTML = FormatNumber(Math.round(g_nPresentTotalEnergyUsage_SM_Before));

	//
	// Present Total Energy Cost Before
	//
	g_nPresentTotalEnergyCost_SM_Before = g_nPresentTotalEnergyUsage_SM_Before * parseFloat(CleanString(frm.txtEnergyCosts.value));
	document.getElementById('CostBeforeSnack').innerHTML = FormatCurrency(FormatNumber(g_nPresentTotalEnergyCost_SM_Before));


	//*****************************************
	//* AFTER Snack Miser Installation
	//*****************************************

	//
	// Primary POH/Yr After
	//
	if (g_nPrimaryPOHPerWeek > parseInt(frm.txtOccupiedHours.value))

		g_nPrimaryPOHPerYear_SM_After = parseInt(frm.txtOccupiedHours.value) * 52;
	else
		g_nPrimaryPOHPerYear_SM_After = g_nPrimaryPOHPerWeek * 52;

	//
	// Primary Energy/Yr After
	//
	g_nPrimaryEnergyPerYear_SM_After = parseInt(frm.txtPowerSnack.value) * g_nPrimaryPOHPerYear_SM_After / 1000 ;

	//
	// Present Total Energy Usage After
	//
	g_nPresentTotalEnergyUsage_SM_After = g_nPrimaryEnergyPerYear_SM_After * parseInt(frm.txtNumSnackMachines.value);
	document.getElementById('kWhAfterSnack').innerHTML = FormatNumber(Math.round(g_nPresentTotalEnergyUsage_SM_After));

	//
	// Present Total Energy Cost After
	//
	g_nPresentTotalEnergyCost_SM_After = g_nPresentTotalEnergyUsage_SM_After * parseFloat(CleanString(frm.txtEnergyCosts.value));
	document.getElementById('CostAfterSnack').innerHTML = FormatCurrency(FormatNumber(g_nPresentTotalEnergyCost_SM_After));

	//
	// Total kWh savings  ***
	//
	document.getElementById('kWhSavingsSnack').innerHTML = FormatNumber(Math.round(g_nPresentTotalEnergyUsage_SM_Before - g_nPresentTotalEnergyUsage_SM_After));

	//
	// % kWh Savings
	//
	var nSavings = 1 - (g_nPresentTotalEnergyUsage_SM_After/g_nPresentTotalEnergyUsage_SM_Before);
	if(nSavings)
	{
		document.getElementById('EnergySavingsSnack').innerHTML = Math.round(nSavings * 100) + "%";
	}
	else
	{
		document.getElementById('EnergySavingsSnack').innerHTML = 0;
	}




	//
	// Total Cost savings  *** 
	//
	document.getElementById('CostSavingsSnack').innerHTML = FormatCurrency(FormatNumber(g_nPresentTotalEnergyCost_SM_Before - g_nPresentTotalEnergyCost_SM_After));

	//
	// % Cost Savings
	//
	var nSavings = 1 - (g_nPresentTotalEnergyCost_SM_After/g_nPresentTotalEnergyCost_SM_Before);
	if(nSavings)
	{
		document.getElementById('pCostSavingsSnack').innerHTML = Math.round(nSavings * 100) + "%";
	}
	else
	{
		document.getElementById('pCostSavingsSnack').innerHTML = 0;
	}

}

function UpdateProjectSummary()
{
	var frm = document.frmMain;

	var ttlPresentkWh = Math.round(g_nPresentTotalEnergyUsage_VM_Before + g_nPresentTotalEnergyUsage_SM_Before);
	var ttlProjectedkWh = Math.round(g_nPresentTotalEnergyUsage_VM_After + g_nPresentTotalEnergyUsage_SM_After);
	var ttlPresentCost = g_nPresentTotalEnergyCost_VM_Before + g_nPresentTotalEnergyCost_SM_Before;
	var ttlProjectedCost = g_nPresentTotalEnergyCost_VM_After + g_nPresentTotalEnergyCost_SM_After;
	var nAnnualSavings = ttlPresentCost - ttlProjectedCost;
	var nPercentSavings = 1 - ( ttlProjectedCost / ttlPresentCost);
	var nPercentkWhSavings = 1 - ( ttlProjectedkWh / ttlPresentkWh);
	var ttlProjectCost = (parseFloat(CleanString(frm.txtVendingMiserPrice.value)) * parseInt(frm.txtNumColdMachines.value)) +
			 (parseFloat(CleanString(frm.txtSnackMiserPrice.value)) * parseInt(frm.txtNumSnackMachines.value));
	var nBreakEven = (ttlProjectCost / nAnnualSavings) * 12;
	var nFiveYearSavings = 5 * nAnnualSavings;
	var nFiveYearReturn = (nFiveYearSavings - ttlProjectCost ) / ttlProjectCost;

	document.getElementById('PresentkWh').innerHTML = ttlPresentkWh.toString();
	document.getElementById('ProjectedkWh').innerHTML = ttlProjectedkWh.toString();
	document.getElementById('kWhSavings').innerHTML = ttlPresentkWh - ttlProjectedkWh;

	document.getElementById('PresentCost').innerHTML = FormatCurrency(FormatNumber(ttlPresentCost));
	document.getElementById('ProjectedCost').innerHTML = FormatCurrency(FormatNumber(ttlProjectedCost));
	document.getElementById('AnnualSavings').innerHTML = FormatCurrency(FormatNumber(nAnnualSavings));
	

	document.getElementById('PercentkWhSavings').innerHTML = Math.round(nPercentkWhSavings * 100) + "%";
	if(nPercentSavings)
	{
		document.getElementById('PercentSavings').innerHTML = Math.round(nPercentSavings * 100) + "%";
	}
	else
	{
		document.getElementById('PercentSavings').innerHTML = 0;
	}

	document.getElementById('TotalProjectCost').innerHTML = FormatCurrency(FormatNumber(ttlProjectCost));
	document.getElementById('BreakEven').innerHTML = FormatNumber(nBreakEven);

		document.getElementById('FiveYearSavings').innerHTML = "<font color=#000000>" + FormatCurrency(FormatNumber(nFiveYearSavings)) + "</font>";
	
	if(nFiveYearReturn)
	{
		document.getElementById('FiveYearReturn').innerHTML = "<font color=#000000>" + Math.round(nFiveYearReturn * 100) + "%</font>";
	}
	else
	{
		document.getElementById('FiveYearReturn').innerHTML = 0;
	}
}

function FormatNumber(nNumber)
{
	var strNumber = parseInt(nNumber, 10).toString() + (Math.round((nNumber - parseInt(nNumber, 10)) * 100) / 100).toString().substr(1, 3);
	if ((strNumber.toString().indexOf('.', 0) > 0) && (strNumber.toString().length - strNumber.toString().indexOf('.', 0) == 2))
		strNumber = strNumber.toString() + '0';
	return strNumber;
}

function FormatCurrency(strValue)
{
    var strDecimalSeparator = '.';
    var strThousandSeparator = ',';
    var nPos = strValue.indexOf('.');
    var nLen = parseInt(strValue, 10).toString().length;

    if (nPos > 0)
        strValue = strValue.substr(0, nPos) + strDecimalSeparator + strValue.substr(nPos + 1, strValue.length - nPos);
    else
        nPos = strValue.length;

    while (nLen > 3)
        {
        nPos -= 3;
        strValue = strValue.substr(0, nPos) + strThousandSeparator + strValue.substr(nPos, strValue.length - nPos + 1);
        nLen -= 3;
        }

    return '&#163;' + strValue;
} 

function CleanString(strValue)
{
	return strValue.replace("£", "");
}


