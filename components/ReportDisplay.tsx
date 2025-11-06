
import React from 'react';
import { AnalysisReport, Location, Priority } from '../types';
import { MailIcon } from './icons';

interface ReportDisplayProps {
  report: AnalysisReport;
  location: Location;
}

const priorityStyles: { [key in Priority]: { bg: string; text: string; ring: string } } = {
  [Priority.Low]: { bg: 'bg-green-800/50', text: 'text-green-300', ring: 'ring-green-500' },
  [Priority.Medium]: { bg: 'bg-yellow-800/50', text: 'text-yellow-300', ring: 'ring-yellow-500' },
  [Priority.High]: { bg: 'bg-red-800/50', text: 'text-red-300', ring: 'ring-red-500' },
};

const ReportDisplay: React.FC<ReportDisplayProps> = ({ report, location }) => {
  const styles = priorityStyles[report.priority];

  const handleSendEmail = () => {
    const subject = `[${report.priority} Priority] Issue Report: ${report.problem}`;
    const body = `
Dear ${report.recipient.name},

An issue has been identified and requires your attention.

Problem: ${report.problem}
Priority: ${report.priority}
Location: https://www.google.com/maps?q=${location.latitude},${location.longitude}

Generated Report:
-----------------
${report.report}
-----------------

Suggested Remediation:
-----------------
${report.remediationSteps}
-----------------

This report was generated automatically.

Regards,
AI Issue Reporter
    `;
    window.location.href = `mailto:${report.recipient.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="w-full bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-6 space-y-6 animate-fade-in">
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold text-white">{report.problem}</h2>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${styles.bg} ${styles.text} ring-1 ring-inset ${styles.ring}`}>
          {report.priority} Priority
        </span>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Detailed Report</h3>
        <p className="text-gray-300 whitespace-pre-wrap">{report.report}</p>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Suggested Remediation</h3>
        <p className="text-gray-300 whitespace-pre-wrap">{report.remediationSteps}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="bg-gray-900/50 p-3 rounded-lg">
            <p className="font-semibold text-gray-400">Recipient</p>
            <p className="text-white">{report.recipient.name} ({report.recipient.email})</p>
        </div>
        <div className="bg-gray-900/50 p-3 rounded-lg">
            <p className="font-semibold text-gray-400">Location</p>
            <a 
                href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 hover:underline"
            >
                {location.latitude.toFixed(5)}, {location.longitude.toFixed(5)}
            </a>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-700">
        <button 
          onClick={handleSendEmail} 
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500 transition-all duration-200"
        >
          <MailIcon className="w-5 h-5" />
          Send Report via Email
        </button>
      </div>
    </div>
  );
};

export default ReportDisplay;
