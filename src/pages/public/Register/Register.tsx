import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Briefcase } from 'lucide-react';
import { TEXT } from '@/constants/text';
import { ROUTES } from '@/constants/routes';
import { ROLES } from '@/constants/roles';
import { Input } from '@/components/forms/FormField';
import { Button } from '@/components/buttons/Button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { registerUser, selectAuthLoading, selectAuthError } from '@/redux/auth/authSlice';
import { addToast } from '@/redux/ui/uiSlice';
import type { RegisterFormData } from '@/types';
import { cn } from '@/utils';

export function Register() {
  const [selectedRole, setSelectedRole] = useState<'customer' | 'cleaner'>('customer');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    const result = await dispatch(registerUser({ ...data, role: selectedRole }));
    if (registerUser.fulfilled.match(result)) {
      dispatch(addToast({ type: 'success', message: TEXT.AUTH.REGISTER_SUCCESS }));
      navigate(selectedRole === ROLES.CLEANER ? ROUTES.CLEANER.DASHBOARD : ROUTES.CUSTOMER.DASHBOARD);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-text">{TEXT.REGISTER.TITLE}</h1>
          <p className="text-text-muted mt-2">{TEXT.REGISTER.SUBTITLE}</p>
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium text-text mb-3">{TEXT.REGISTER.SELECT_ROLE}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { role: 'customer' as const, icon: User, label: TEXT.REGISTER.CUSTOMER, desc: TEXT.REGISTER.CUSTOMER_DESC },
              { role: 'cleaner' as const, icon: Briefcase, label: TEXT.REGISTER.CLEANER, desc: TEXT.REGISTER.CLEANER_DESC },
            ].map((item) => (
              <button
                key={item.role}
                type="button"
                onClick={() => setSelectedRole(item.role)}
                className={cn(
                  'rounded-2xl border-2 p-4 text-left transition-all',
                  selectedRole === item.role
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/30'
                )}
              >
                <item.icon className={cn('h-6 w-6 mb-2', selectedRole === item.role ? 'text-primary' : 'text-text-muted')} />
                <p className="font-semibold text-sm">{item.label}</p>
                <p className="text-xs text-text-muted mt-1">{item.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">{error}</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label={TEXT.REGISTER.FIRST_NAME} {...register('firstName', { required: 'Required' })} error={errors.firstName?.message} />
            <Input label={TEXT.REGISTER.LAST_NAME} {...register('lastName', { required: 'Required' })} error={errors.lastName?.message} />
          </div>
          <Input label={TEXT.REGISTER.EMAIL} type="email" {...register('email', { required: 'Required' })} error={errors.email?.message} />
          <Input label={TEXT.REGISTER.PHONE} type="tel" {...register('phone', { required: 'Required' })} error={errors.phone?.message} />
          {selectedRole === 'cleaner' && (
            <Input label={TEXT.REGISTER.BUSINESS_NAME} {...register('businessName')} />
          )}
          <Input label={TEXT.REGISTER.PASSWORD} type="password" {...register('password', { required: 'Required', minLength: { value: 8, message: 'Min 8 characters' } })} error={errors.password?.message} />
          <Input label={TEXT.REGISTER.CONFIRM_PASSWORD} type="password" {...register('confirmPassword', { required: 'Required' })} error={errors.confirmPassword?.message} />
          <Button type="submit" fullWidth size="lg" isLoading={isLoading}>{TEXT.REGISTER.SUBMIT}</Button>
        </form>

        <p className="text-xs text-text-muted text-center mt-4">{TEXT.REGISTER.TERMS}</p>
        <p className="text-center text-sm text-text-muted mt-4">
          {TEXT.REGISTER.HAVE_ACCOUNT}{' '}
          <Link to={ROUTES.LOGIN} className="text-primary font-medium hover:underline">{TEXT.REGISTER.LOGIN}</Link>
        </p>
      </motion.div>
    </div>
  );
}
