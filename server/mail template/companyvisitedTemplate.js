const emailTemplate = (companyName, eligibility, arrivalDate) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    <div style="background-color: #4285F4; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
      <img src="https://placement-management.vercel.app/assests/images/Logo/Logo.png" alt="University Logo" style="max-width: 150px; height: auto;">
    </div>
    <div style="padding: 30px; background-color: #ffffff; border-radius: 0 0 8px 8px;">
      <p style="font-size: 18px; color: #333333; margin-bottom: 20px;">Hello,</p>
      <p style="font-size: 16px; color: #666666; margin-bottom: 20px;">We are pleased to inform you that <strong>${companyName}</strong> will be visiting our campus on <strong>${arrivalDate}</strong>.</p>
      <p style="font-size: 16px; color: #666666; margin-bottom: 10px;">Eligibility criteria:</p>
      <ul style="font-size: 16px; color: #666666; padding-left: 20px; margin-bottom: 20px;">
        <li style="margin-bottom: 5px;">CGPA: ${eligibility.CGPA} and above</li>
        <li style="margin-bottom: 5px;">Backlogs: Only ${eligibility.backlogs} allowed</li>
        <li style="margin-bottom: 5px;">Tenth Percentage: ${eligibility.tenth} and above</li>
        <li style="margin-bottom: 5px;">Twelfth Percentage: ${eligibility.twelth} and above</li>
      </ul>
      <p style="font-size: 16px; color: #666666;">Regards,<br>Your University Team</p>
    </div>
    <div style="background-color: #f5f5f5; padding: 20px; text-align: center; border-top: 1px solid #ddd;">
      <p style="font-size: 12px; color: #999999;">This is an automated message. Please do not reply.</p>
    </div>
  </div>
`;

module.exports = emailTemplate;
