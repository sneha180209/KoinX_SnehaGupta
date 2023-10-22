import React, { useState } from 'react'
import './Middle.css'

function Middle() {
    const [purchase, setPurchase]=useState('')
    const [sale, setSale]=useState('')
    const [expenses, setExpenses]=useState('')
    const lessThanSymbol = '<';
    const moreThanSymbol = '>';

    const [selectedValue, setSelectedValue] = useState('hosting-small');
    const [annualincome, setAnnualIncome]=useState('$0 - $18,200')
    const [taxrate, setTaxRate]=useState('0%')

    const[taxtopay, setTaxToPay]=useState(0.0)

    const taxconversion = (income) => {
        if (income === "$0 - $18,200" || income==="") {
          setAnnualIncome("$0 - $18,200");
          setTaxRate("0%");
          setTaxToPay(0);
        } 
        else if (income === "$18,201 - $45,000" || income==="") {
          setAnnualIncome("$18,201 - $45,000");
          setTaxRate("Nil + 19% of excess over $18,200");
          setTaxToPay(0.19);
        } 
        else if (income === "$45,001 - $120,000" || income==="") {
          setAnnualIncome("$45,001 - $120,000");
          setTaxRate("$ 5,902 + 32.5% of excess over $45,001");
          setTaxToPay(0.325);
        } 
        else if (income === "$120,001 - $180,000" || income==="") {
          setAnnualIncome("$120,001 - $180,000");
          setTaxRate("$ 29,467 + 37% of excess over $120,000");
          setTaxToPay(0.37);
        } 
        else {
          setAnnualIncome("$180,001+");
          setTaxRate("$ 51,667 + 45% of excess over $180,000");
          setTaxToPay(0.45);
        }
      };
      


    const submission=()=>{
        let purchasePrice = purchase;
        let salePrice = sale;
        let expense = expenses;
        let capitalGainsAmount = salePrice - purchasePrice - expense;
        let longTermGainsDiscount;
        let netCapitalGainsTaxAmount;
        let taxYouNeedToPay;
        if (selectedValue === 'hosting-large' && capitalGainsAmount>0) {
        longTermGainsDiscount = capitalGainsAmount * 0.5;
        netCapitalGainsTaxAmount = capitalGainsAmount-longTermGainsDiscount;
        taxYouNeedToPay=taxtopay*netCapitalGainsTaxAmount;
        } else {
        longTermGainsDiscount = 0; // Set a default value if not selected
        netCapitalGainsTaxAmount = salePrice - purchasePrice - expense;
        taxYouNeedToPay=taxtopay*netCapitalGainsTaxAmount;
        }


        document.getElementById('gainsamt').innerHTML = capitalGainsAmount;
        document.getElementById('longtermgains').innerHTML = longTermGainsDiscount;
        document.getElementById('netcapitalgains').innerHTML = "$"+netCapitalGainsTaxAmount;
        document.getElementById('taxyouneedtopay').innerHTML = "$"+taxYouNeedToPay;
    }
    return (
        <div className='middle'>
            <h1>Free Crypto Tax Calculator Australia</h1>
            <div className="w-full grid grid-cols-2 gap-8 mx-4 p-4">
                <div className='flex flex-wrap items-start justify-start'>
                    <p id="financialyear" className='mx-4'>Financial Year</p>
                    <button id="financialYearDropdownButton" data-dropdown-toggle="financialYearDropdown"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus-ring-blue-800"
                        type="button">FY 2023-24 <svg
                            className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    <div id="financialYearDropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark-bg-gray-700">
                        <ul className="py-2 text-sm text-gray-700 dark-text-gray-200"
                            aria-labelledby="financialYearDropdownButton">
                            <li>
                                <a href="#"
                                    className="block px-4 py-2 hover-bg-gray-100 dark-hover-bg-gray-600 dark-hover-text-white">FY
                                    2023-24</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='flex flex-wrap items-start justify-start'>
                    <p id="country" className='mx-4'>Country</p>
                    <button id="countryDropdownButton" data-dropdown-toggle="countryDropdown"
                        className="text-white bg-blue-700 hover-bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center dark-bg-blue-600 dark-hover-bg-blue-700 dark-focus-ring-blue-800"
                        type="button">Australia <svg
                            className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    <div id="countryDropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark-bg-gray-700">
                        <ul className="py-2 text-sm text-gray-700 dark-text-gray-200"
                            aria-labelledby="countryDropdownButton">
                            <li>
                                <a href="#"
                                    className="block px-4 py-2 hover-bg-gray-100 dark-hover-bg-gray-600 dark-hover-text-white">Australia</a>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
            <hr />

            <div className="w-full grid grid-cols-2 gap-4 mx-auto p-4">
                <div className='flex flex-wrap items-start justify-start'>
                    <label htmlFor="purchase-price"
                        className="block mb-2 text-sm font-medium text-gray-900 dark-text-white">Enter purchase price of
                        crypto</label>
                    <input type="text" id="purchase-price" aria-describedby="helper-text-explanation"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus-border-blue-500 block w-full p-2.5 dark-bg-gray-700 dark-border-gray-600 dark-placeholder-gray-400 dark-text-white dark-focus-ring-blue-500 dark-focus-border-blue-500"
                        placeholder="0" value={purchase} onChange={(e)=>setPurchase(e.target.value)}/>
                </div>

                <div className='flex flex-wrap items-start justify-start'>
                    <label htmlFor="sale-price" className="block mb-2 text-sm font-medium text-gray-900 dark-text-white">Enter
                        sale price of crypto</label>
                    <input type="text" id="sale-price" aria-describedby="helper-text-explanation"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus-border-blue-500 block w-full p-2.5 dark-bg-gray-700 dark-border-gray-600 dark-placeholder-gray-400 dark-text-white dark-focus-ring-blue-500 dark-focus-border-blue-500"
                        placeholder="0" value={sale} onChange={(e)=>setSale(e.target.value)}/>
                </div>
            </div>

            <div className="w-full grid grid-cols-2 gap-4 mx-auto p-4">
                <div className='flex flex-wrap items-start justify-start'>
                    <label htmlFor="expenses" className="block mb-2 text-sm font-medium text-gray-900 dark-text-white">Enter
                        your Expenses</label>
                    <input type="email" id="expenses" aria-describedby="helper-text-explanation"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus-border-blue-500 block w-full p-2.5 dark-bg-gray-700 dark-border-gray-600 dark-placeholder-gray-400 dark-text-white dark-focus-ring-blue-500 dark-focus-border-blue-500"
                        placeholder="0" value={expenses} onChange={(e)=>setExpenses(e.target.value)}/>
                </div>

                <div className='grid-cols-1'>
                    <h3 className="block mb-2 text-sm font-medium text-gray-900 dark-text-white">Investment Type</h3>
                    <div className="flex flex-wrap items-start justify-start gap-4">
                        <label htmlFor="hosting-small"
                        className={`inline-flex items-start justify-start w-32 p-5 text-gray-500 bg-white border ${selectedValue === 'hosting-small' ? 'border-blue-600' : 'border-gray-200'} rounded-lg cursor-pointer dark-hover-text-gray-300 dark-border-gray-700 dark-peer-checked-text-blue-500 dark-peer-checked-border-blue-600 dark-peer-checked-text-blue-600 hover-text-gray-600 hover-bg-gray-100 dark-text-gray-400 dark-bg-gray-800 dark-hover-bg-gray-700`}
                        >
                        <input type="radio" id="hosting-small" name="hosting" value="hosting-small" className="hidden peer" required onChange={(e)=>setSelectedValue(e.target.value)} checked={selectedValue === 'hosting-small'} />
                        <div className="block">
                            <div className="w-half text-sm font-semibold">{'< 12 months'}</div>
                        </div>
                        </label>

                        <label htmlFor="hosting-large"
                        className={`inline-flex items-start justify-start w-32 p-5 text-gray-500 bg-white border ${selectedValue === 'hosting-large' ? 'border-blue-600' : 'border-gray-200'} rounded-lg cursor-pointer dark-hover-text-gray-300 dark-border-gray-700 dark-peer-checked-text-blue-500 dark-peer-checked-border-blue-600 dark-peer-checked-text-blue-600 hover-text-gray-600 hover-bg-gray-100 dark-text-gray-400 dark-bg-gray-800 dark-hover-bg-gray-700`}
                        >
                        <input type="radio" id="hosting-large" name="hosting" value="hosting-large" className="hidden peer" required onChange={(e)=>setSelectedValue(e.target.value)} checked={selectedValue === 'hosting-large'} />
                        <div className="block">
                            <div className="w-half text-sm font-semibold">{' > 12 months'}</div>
                        </div>
                        </label>
                    </div>
                </div>
            </div>

            <div className='w-full grid grid-cols-2 gap-4 mx-auto p-4'>
                <div className='grid-cols-1'>
                    <label htmlFor="annual-income"
                        className="block mb-2 text-sm font-medium text-gray-900 dark-text-white">Select your Annual
                        Income</label>
                    <div className='flex flex-wrap items-start justify-start'>
                        <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown"
                            className="w-full text-black bg-gray-200 hover-bg-gray-300 focus:ring-4 focus-outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark-bg-blue-600 dark-hover-bg-blue-700 dark-focus-ring-blue-800"
                            type="button">{annualincome}<svg
                                className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="m1 1 4 4 4-4" />
                            </svg>
                        </button>

                        <div id="dropdown" className="w-96 z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark-bg-gray-700">
                            <ul className="py-2 text-sm text-gray-700 dark-text-gray-200"
                                aria-labelledby="dropdownDefaultButton">
                                <li>
                                    <a href="#"
                                        className="w-full block px-4 py-2 hover-bg-gray-100 dark-hover-bg-gray-600 dark-hover-text-white" id="$0 - $18,200" onClick={() => taxconversion("$0 - $18,200")}>$0 - $18,200</a>
                                </li>
                                <li>
                                    <a href="#"
                                        className="w-full block px-4 py-2 hover-bg-gray-100 dark-hover-bg-gray-600 dark-hover-text-white" id="$18,201 - $45,000" onClick={() => taxconversion("$18,201 - $45,000")}>$18,201 - $45,000</a>
                                </li>
                                <li>
                                    <a href="#"
                                        className="w-full block px-4 py-2 hover-bg-gray-100 dark-hover-bg-gray-600 dark-hover-text-white" id="$45,001 - $120,000" onClick={() => taxconversion("$45,001 - $120,000")}>$45,001 - $120,000</a>
                                </li>
                                <li>
                                    <a href="#"
                                        className="w-full block px-4 py-2 hover-bg-gray-100 dark-hover-bg-gray-600 dark-hover-text-white" id="$120,001 - $180,000" onClick={() => taxconversion("$120,001 - $180,000")}>$120,001 - $180,000</a>
                                </li>
                                <li>
                                    <a href="#"
                                        className="w-full block px-4 py-2 hover-bg-gray-100 dark-hover-bg-gray-600 dark-hover-text-white" id="$180,001+" onClick={() => taxconversion("$180,001+")}>$180,001+</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='grid-cols-1 gap-16 flex items-center'>
                    <div>
                        <h4>Tax Rate</h4>
                        <p id="taxrateid">{taxrate}</p>
                    </div>
                    <button onClick={submission} className="relative inline-flex items-center justify-center p-0.5 mb-2 ml-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                        <span className="relative px-3 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Submit
                        </span>
                    </button>
                </div>
            </div>
            
            <div className='answer'>
                <div className="w-full grid grid-cols-2 gap-4 mx-auto p-4">
                    <div className='flex flex-wrap items-start justify-start'>
                        <label htmlFor="capital-gains-amount"
                            className="block mb-2 text-sm font-medium text-gray-900 dark-text-white">Capital Gains Amount</label>
                        <div id="gainsamt"  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus-border-blue-500 block w-full h-10 p-2.5 dark-bg-gray-700 dark-border-gray-600 dark-placeholder-gray-400 dark-text-white dark-focus-ring-blue-500 dark-focus-border-blue-500'></div>
                    </div>

                    <div className='flex flex-wrap items-start justify-start'>
                        <label htmlFor="long-term-gains-discount"
                            className="block mb-2 text-sm font-medium text-gray-900 dark-text-white">Discount for Long Term Gains</label>
                        <div id="longtermgains" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full h-10 p-2.5 dark-bg-gray-700 dark-border-gray-600 dark-placeholder-gray-400'></div>

                    </div>
                </div>

                <div className="w-full grid grid-cols-2 gap-4 mx-auto p-4">
                    <div className='bg-green-200 rounded-lg grid grid-cols-1 p-8'>
                        <h6>Net Capital gains tax amount</h6>
            
                        <h5 className="font-bold" id="netcapitalgains">-</h5>
                    </div>
                    <div className='bg-blue-200 rounded-lg grid grid-cols-1 p-8'>
                        <h6>The tax you need to pay*</h6>
            
                        <h5 className='font-bold' id="taxyouneedtopay">-</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Middle
