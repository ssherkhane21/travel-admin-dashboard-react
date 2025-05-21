
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHeader from '../../components/ui/PageHeader';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

const WalletSettings = () => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  
  // Mock settings data
  const form = useForm({
    defaultValues: {
      minWithdrawal: '10',
      maxWithdrawal: '1000',
      dailyWithdrawalLimit: '2000',
      processingFee: '2',
      processingTime: '1-3',
      allowedPaymentMethods: ['bank_transfer', 'paypal'],
      requireKYC: true,
      minimumBalance: '5',
    },
  });

  const onSubmit = async (data) => {
    setIsSaving(true);
    console.log('Form data submitted:', data);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div>
      <PageHeader 
        title="Wallet Settings" 
        description="Configure wallet transaction limits and rules"
        action={
          <Button 
            variant="outline" 
            onClick={() => navigate('/wallet/transactions')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Transactions
          </Button>
        }
      />

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="minWithdrawal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Withdrawal ($)</FormLabel>
                      <FormControl>
                        <input
                          type="number"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Minimum amount a user can withdraw from their wallet
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="maxWithdrawal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Withdrawal ($)</FormLabel>
                      <FormControl>
                        <input
                          type="number"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Maximum amount a user can withdraw in a single transaction
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dailyWithdrawalLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Daily Withdrawal Limit ($)</FormLabel>
                      <FormControl>
                        <input
                          type="number"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Total amount a user can withdraw in 24 hours
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="processingFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Processing Fee (%)</FormLabel>
                      <FormControl>
                        <input
                          type="number"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Fee charged for withdrawal transactions (%)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="processingTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Processing Time (Business Days)</FormLabel>
                      <FormControl>
                        <input
                          type="text"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Estimated time to process withdrawal requests
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="minimumBalance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Balance ($)</FormLabel>
                      <FormControl>
                        <input
                          type="number"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Minimum balance required to maintain in wallet
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="allowedPaymentMethods"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Allowed Payment Methods</FormLabel>
                      <FormControl>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="bank_transfer"
                              checked={field.value.includes('bank_transfer')}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  field.onChange([...field.value, 'bank_transfer']);
                                } else {
                                  field.onChange(field.value.filter(method => method !== 'bank_transfer'));
                                }
                              }}
                              className="mr-2"
                            />
                            <label htmlFor="bank_transfer">Bank Transfer</label>
                          </div>
                          
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="paypal"
                              checked={field.value.includes('paypal')}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  field.onChange([...field.value, 'paypal']);
                                } else {
                                  field.onChange(field.value.filter(method => method !== 'paypal'));
                                }
                              }}
                              className="mr-2"
                            />
                            <label htmlFor="paypal">PayPal</label>
                          </div>
                          
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="credit_card"
                              checked={field.value.includes('credit_card')}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  field.onChange([...field.value, 'credit_card']);
                                } else {
                                  field.onChange(field.value.filter(method => method !== 'credit_card'));
                                }
                              }}
                              className="mr-2"
                            />
                            <label htmlFor="credit_card">Credit Card</label>
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Select allowed payment methods for deposits and withdrawals
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="requireKYC"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>KYC Verification</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="requireKYC"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            className="mr-2"
                          />
                          <label htmlFor="requireKYC">Require KYC verification for withdrawals</label>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Users must complete identity verification before withdrawing funds
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Settings
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default WalletSettings;
