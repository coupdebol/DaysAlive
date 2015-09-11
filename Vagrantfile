# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|

  config.vm.box = "hashicorp/precise32"

  config.vm.network "forwarded_port", guest: 5000, host: 8080

  config.vm.synced_folder "../DaysAlive", "/home/vagrant/DaysAlive"

  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "playbook.yml"
  end
end
