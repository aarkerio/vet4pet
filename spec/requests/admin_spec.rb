it "accesses the dashboard" do
  
  User.create( email: 'user@example.com',
               password: 'secret',
               password_confirmation: 'secret')
  
  visit root_path
  click_link 'Sign In'
  fill_in 'Email', with: 'user@example.com'
  fill_in 'Password', with: 'secret'
  click_button 'Sign In'

  expect(current_path).to eq admin_dashboard_path within 'h1' do
    expect(page).to have_content 'Administration'
  end

  expect(should).to have_content 'Manage Users'
  expect(page).to have_content 'Manage Articles'
end

