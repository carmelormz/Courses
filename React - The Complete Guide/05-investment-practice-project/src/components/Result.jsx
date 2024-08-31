import { calculateInvestmentResults, formatter } from '../util/investment';
export const Result = ({ values }) => {
  const annualData = calculateInvestmentResults(values);

  return (
    <table id='result'>
      <thead>
        <tr>
          <th>Year</th>
          <th>Investment Value</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {annualData.map((data, i) => {
          const totalInterest =
            data.valueEndOfYear -
            data.annualInvestment * data.year -
            values.initialInvestment;

          const totalAmountInvested = data.valueEndOfYear - totalInterest;

          return (
            <tr key={i}>
              <td>{data.year}</td>
              <td>{formatter.format(data.valueEndOfYear)}</td>
              <td>{formatter.format(data.interest)}</td>
              <td>{formatter.format(totalInterest)}</td>
              <td>{formatter.format(totalAmountInvested)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
