import React from "react";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FiDollarSign, FiClock, FiCreditCard, FiHash } from 'react-icons/fi'

const PaymentHistory = () => {
  const formatDate=(date)=>{
    return new Date(date).toDateString()
  }
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    isPending,
    data: payments = [],
    error,
  } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`payments?email=${user?.email}`);
      return res.data
    },
  });

  if (isPending) {
    return <p>Loading.........</p>;
  }
  // refetch()
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <div className="flex items-center">
                <FiHash className="mr-2" /> Transaction ID
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <div className="flex items-center">
                <FiDollarSign className="mr-2" /> Amount
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <div className="flex items-center">
                <FiCreditCard className="mr-2" /> Method
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <div className="flex items-center">
                <FiClock className="mr-2" /> Date Paid
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Paid By
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {payments?.map((payment) => (
            <tr key={payment._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                {payment.transactionId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                ${payment.cost.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                {payment.paymentMethod[0]}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(payment.paid_at)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {payment.created_by?.name || payment.created_by?.email || "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {payments?.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No payment history found
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
