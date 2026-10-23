import { siteConfig } from '../config/siteConfig';
import { InquiryFormData, InquirySubmissionResult } from '../types';

/**
 * Service to handle catering inquiries.
 * Follows honest submission architecture:
 * - If siteConfig.api.inquiryEndpoint is defined, attempts HTTP POST to the backend endpoint.
 * - If unconfigured (siteConfig.api.isDemoMode = true), logs to developer console and returns
 *   a transparent notification indicating demo staging mode until a backend endpoint is hooked up.
 */
export async function submitCateringInquiry(
  data: InquiryFormData
): Promise<InquirySubmissionResult> {
  const endpoint = siteConfig.api.inquiryEndpoint;
  const isDemo = siteConfig.api.isDemoMode || !endpoint;

  // Simulate network latency (500ms) to ensure UX shows real loading/disabled states
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (!isDemo && endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const resData = await response.json().catch(() => ({}));
      return {
        success: true,
        referenceNumber: resData.referenceNumber || `PF-${Date.now().toString().slice(-6)}`,
        message: 'Thank you! Your catering inquiry has been received. Our team will contact you shortly.',
        isDemoMode: false,
      };
    } catch (error) {
      console.error('Inquiry submission error:', error);
      return {
        success: false,
        message:
          'Unable to send inquiry at this moment due to a network connection issue. Please check your connection or reach out directly.',
        isDemoMode: false,
      };
    }
  }

  // Staging / Demo preview mode:
  // Honestly notify user that form validation succeeded and provide a simulated reference
  console.info('[Perry Foods Demo] Validated catering inquiry payload:', data);

  const demoRef = `DEMO-${Date.now().toString().slice(-6)}`;
  return {
    success: true,
    referenceNumber: demoRef,
    message: `Inquiry validated successfully! [Demo Mode]: In this preview build, inquiries are verified client-side. To transmit live notifications to your inbox, configure 'api.inquiryEndpoint' in siteConfig.ts.`,
    isDemoMode: true,
  };
}
