import { useState, useMemo } from 'react'
import { Calculator, MessageCircle, HelpCircle, ArrowRight } from 'lucide-react'
import { formatLKR, formatLKRWords } from '../utils/format'

export default function LoanCalculator({ vehiclePrice = 5000000, vehicleTitle = 'Vehicle' }) {
  const [price, setPrice] = useState(vehiclePrice || 5000000)
  const [downPercent, setDownPercent] = useState(30)
  const [months, setMonths] = useState(48)
  const [rate, setRate] = useState(14) // Typical Sri Lanka lease/loan rate p.a.

  const calculation = useMemo(() => {
    const principal = Math.max(0, price * (1 - downPercent / 100))
    const downAmount = price * (downPercent / 100)
    const monthlyRate = rate / 100 / 12

    let monthlyPayment = 0
    if (monthlyRate === 0 || months === 0) {
      monthlyPayment = months > 0 ? principal / months : 0
    } else {
      monthlyPayment =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1)
    }

    const totalPayable = downAmount + monthlyPayment * months
    const totalInterest = monthlyPayment * months - principal

    return {
      downAmount,
      principal,
      monthlyPayment: Math.round(monthlyPayment),
      totalPayable: Math.round(totalPayable),
      totalInterest: Math.round(totalInterest),
    }
  }, [price, downPercent, months, rate])

  const waMessage = encodeURIComponent(
    `Hello TS SALES MART, I am interested in vehicle financing / leasing for "${vehicleTitle}" (Price: ${formatLKR(
      price
    )}). Estimated Down Payment: ${formatLKR(calculation.downAmount)} (${downPercent}%), Monthly Installment: ~${formatLKR(
      calculation.monthlyPayment
    )} for ${months} months. Can you help me arrange this?`
  )
  const waUrl = `https://wa.me/94772056400?text=${waMessage}`

  return (
    <div className="rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-8 shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand">
            <Calculator size={20} />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold uppercase text-ink">
              Lease &amp; Loan Calculator
            </h3>
            <p className="text-xs text-muted">Estimate monthly payments for Sri Lanka</p>
          </div>
        </div>
        <span className="badge bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
          Estimated Quote
        </span>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* Sliders and Inputs */}
        <div className="space-y-5">
          {/* Vehicle Price */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold">
              <label htmlFor="loan-price" className="text-gray-700">Vehicle Price</label>
              <span className="text-brand font-bold">{formatLKR(price)}</span>
            </div>
            <input
              id="loan-price"
              type="range"
              min={1000000}
              max={50000000}
              step={250000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="mt-2 w-full accent-brand cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
              <span>Rs. 1M</span>
              <span>Rs. 25M</span>
              <span>Rs. 50M</span>
            </div>
          </div>

          {/* Down Payment % */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold">
              <label htmlFor="loan-down" className="text-gray-700">Down Payment ({downPercent}%)</label>
              <span className="text-gray-900 font-bold">{formatLKR(calculation.downAmount)}</span>
            </div>
            <input
              id="loan-down"
              type="range"
              min={20}
              max={70}
              step={5}
              value={downPercent}
              onChange={(e) => setDownPercent(Number(e.target.value))}
              className="mt-2 w-full accent-brand cursor-pointer"
            />
            {/* Quick buttons */}
            <div className="mt-2 flex gap-1.5">
              {[20, 30, 40, 50].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setDownPercent(pct)}
                  className={`flex-1 rounded-lg py-1 text-xs font-semibold border transition cursor-pointer ${
                    downPercent === pct
                      ? 'border-brand bg-brand text-white'
                      : 'border-gray-200 bg-surface text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          {/* Loan Period */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold">
              <label htmlFor="loan-period" className="text-gray-700">Tenure ({months / 12} Years / {months} Months)</label>
            </div>
            <div className="mt-2 grid grid-cols-4 gap-1.5">
              {[12, 24, 36, 48, 60].slice(1).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMonths(m)}
                  className={`rounded-lg py-1.5 text-xs font-semibold border transition cursor-pointer ${
                    months === m
                      ? 'border-brand bg-brand text-white'
                      : 'border-gray-200 bg-surface text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {m / 12} Yrs ({m}m)
                </button>
              ))}
            </div>
          </div>

          {/* Indicative Interest Rate */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold">
              <label htmlFor="loan-rate" className="text-gray-700">Indicative Interest Rate ({rate}% p.a.)</label>
            </div>
            <input
              id="loan-rate"
              type="range"
              min={10}
              max={22}
              step={0.5}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="mt-2 w-full accent-brand cursor-pointer"
            />
          </div>
        </div>

        {/* Calculated Results Summary Box */}
        <div className="flex flex-col justify-between rounded-2xl bg-surface p-6 border border-gray-200/80">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted">
              Estimated Monthly Payment
            </p>
            <p className="mt-1 font-display text-4xl sm:text-5xl font-black text-brand tracking-tight">
              {formatLKR(calculation.monthlyPayment)}
              <span className="text-sm font-normal text-muted tracking-normal"> / month</span>
            </p>

            <ul className="mt-5 space-y-2.5 text-xs text-gray-600 border-t border-gray-200 pt-4">
              <li className="flex justify-between">
                <span>Vehicle Value:</span>
                <span className="font-semibold text-gray-900">{formatLKR(price)}</span>
              </li>
              <li className="flex justify-between">
                <span>Initial Down Payment:</span>
                <span className="font-semibold text-gray-900">{formatLKR(calculation.downAmount)}</span>
              </li>
              <li className="flex justify-between">
                <span>Financed Loan Principal:</span>
                <span className="font-semibold text-gray-900">{formatLKR(calculation.principal)}</span>
              </li>
              <li className="flex justify-between">
                <span>Total Interest Payable:</span>
                <span className="font-semibold text-gray-900">{formatLKR(calculation.totalInterest)}</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp w-full !py-3 text-xs sm:text-sm font-bold shadow-md"
            >
              <MessageCircle size={17} /> Inquire About Leasing on WhatsApp
            </a>
            <p className="mt-2 text-[10px] text-gray-400 text-center">
              * Indicative calculations based on typical Sri Lanka leasing rates. Subject to financier approval and terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
